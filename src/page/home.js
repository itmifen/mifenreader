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
	ScrollView,
	StatusBar,
	ListView,
	TimerMixin,
	InteractionManager,
	BackAndroid,
	NativeModules,
	ToastAndroid

} from 'react-native';
import {
	IndicatorViewPager,
	PagerTabIndicator
} from 'rn-viewpager';


import basestyles from '../style/basestyle';
import styles from '../style/homestyle';

import Aritem from '../component/aritem';
import HomeTech from '../component/hometechnology';
import ArticleDetail from './articledetail';
import Test from './test';
import Setting from './setting';

import Config from '../common/config';
import CommonHelper from '../common/commonhelper';
import Immutable from 'immutable';



import DomParser from 'react-native-html-parser';
import SQLite from '../common/sqlitedal';

var commonHelper = new CommonHelper();
var sqlLite = new SQLite();
	var firstClick = 0;

var ds = new ListView.DataSource({
	rowHasChanged: (r1, r2) => r1 !== r2
});
var NativeCommonTools = NativeModules.CommonTools;  

class Home extends Component {
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







	_onhomepress(rowdata) {
			if(navigator) {
				const {
					navigator
				} = this.props;
                
						navigator.push({
							name: 'articledetail',
							component: ArticleDetail,
							params: {
								data: rowdata,
								title: '详情'
							}
						})


				}

		

	}


	_renderTabIndicator() {
		let tabs = [];
		Config.dataapi.forEach(function (value, index, array) {
			tabs.push({
				text: value.title
			})
		})

		return <PagerTabIndicator
			tabs={tabs}
			style={styles.indicatorContainer}
			textStyle={styles.tabTxt}
			selectedTextStyle={styles.selectedTabTxt}
			itemStyle={styles.tabItem}
			selectedItemStyle={styles.selectedTabItem} />;
	}

	render() {
		return (

			<View style={basestyles.container}>

				<IndicatorViewPager
					style={{ flex: 1 }}
					indicator={this._renderTabIndicator() }
					>
					<View style={{ flex: 1 }}>
						<HomeTech onitempress={this._onhomepress.bind(this)}/>
					</View>
					<View>
						<ScrollView
							style={styles.container}>
							<Aritem />
							<Aritem />
							<Aritem />
							<Aritem />
							<Aritem />
						</ScrollView>
					</View>
					<View>
						<Text>
							page three
						</Text>
					</View>
				</IndicatorViewPager>
			</View>
		);
	}
}

export default Home;
