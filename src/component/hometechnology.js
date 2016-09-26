import React, {
	Component
} from 'react';
import {
	StyleSheet,
	TextInput,
	View,
	Text,
	Navigator,
	TouchableOpacity,
	Image,
    ListView
} from 'react-native';


import basestyles from '../style/basestyle';
import styles from '../style/homestyle';

import Aritem from '../component/aritem';
import ArticleDetail from '../page/articledetail';
import Config from '../common/config';
import CommonHelper from '../common/commonhelper';
import Immutable from 'immutable';

import DomParser from 'react-native-html-parser';
import SQLite from '../common/sqlitedal';

var commonHelper = new CommonHelper();
var sqlLite = new SQLite();

var ds = new ListView.DataSource({
	rowHasChanged: (r1, r2) => r1 !== r2
});



class HomeTech extends Component {

	constructor(props) {
		super(props);

        this.state = {
			data: Immutable.Map({
				dataSource: ds,
				listdata: [],
				pageindex: 1,
				listLoaded: false
			})
		};
	}

    loadmore() {
		console.log(this.state.data.get('pageindex'));
		this.setState({
					data: this.state.data.update('listLoaded', v => v = false)
				});

			if(this.state.data.get('listLoaded') == false) {
			console.log('begin getlist');
			this._getlist();
		}


	}


	_getlist()
	{
		sqlLite.GetArticleList(this.state.data.get('pageindex'),(result)=>{
			if(result.rows.length>0)
			{
				this.setState({
					data: this.state.data.update('pageindex', v => v = v+1)
				});

				this.setState({
					data: this.state.data.update('listdata', v => v.concat(result.rows.raw()))
				
				});

				this.setState({
					data: this.state.data.update('dataSource', v => v.cloneWithRows(this.state.data.get('listdata')))
				});

				this.setState({
					data: this.state.data.update('listLoaded', v => v = true)
				});
			}
			else {
				//无数据时，拉取数据,只有第一页才拉取数据
				if(this.state.data.get('pageindex')==1)
				{
					this._fetchdata();
				}

			}
		});
	}






	_renderRow(rowData, rowID) {
		if(rowData && rowData.title) {
			return(
				<Aritem
					itemdata={rowData}
					onSelect={(e)=>this._onpress(e)}
					/>
			)
		} else {
			return null
		}

	}

	_renderFooterLoading() {
		if(this.state.data.get('listLoaded')) {
			return null;
		} else {
			return(
				<View style={{flex:1,justifyContent:'center',height:30,alignItems:'center'}}>
					<Text>加载中...</Text>
				</View>
			);

		}

	}


	_geturls() {

		let urls = [];
		let currtab = Config.dataapi[0].link;
		currtab.forEach(function(value, index, arrary) {
			urls.push(value);
		})
		return urls;

	}


	_fetchdata(url) {

        commonHelper.fetchdata('http://blog.jobbole.com/feed/',()=>{
            commonHelper.fetchdata('http://geek.csdn.net/admin/news_service/rss',()=>{
            this._getlist();
            })
        })

	}


    	_onpress(rowdata) {
			this._onhomepress(rowdata);
	}




	componentDidMount() {
		let urls = this._geturls();
		this.loadmore();
	}

	render() {
		return(
		
						<ListView
							style={{top:0,flex:1,marginBottom:64}}
							dataSource={this.state.data.get('dataSource')}
							renderRow={this._renderRow.bind(this)}
							onEndReached={this.loadmore.bind(this)}
							renderFooter={this._renderFooterLoading.bind(this)}
							/>

				
        
        );
	}
}

export default HomeTech;
