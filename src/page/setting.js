import React, {
	Component,
} from 'react';

import {
	StyleSheet,
	TextInput,
	View,
	Text,
	Navigator,
	TouchableOpacity,
	Image,
	InteractionManager,
  Alert
} from 'react-native';

import Styles from '../style/settingstyle'
import BaseStyles from '../style/basestyle'

import SqliteDal from '../common/sqlitedal';
var sqliteDal=new SqliteDal();

class Setting extends React.Component {

	componentDidMount() {
		InteractionManager.runAfterInteractions(() => {


		});

	}

  _deletecache()
  {
    sqliteDal.DeleteArticle();
  }


	render() {
		return(
			<View style={BaseStyles.container}>
				<TouchableOpacity onPress={() => Alert.alert(
            '确认操作',
            '确定要清除缓存？？',
            [
              {text: '取消'},
              {text: '确认',onPress: () => this._deletecache()},
            ]
          )}>
        <Text>清除缓存
        </Text>
        </TouchableOpacity>

			</View>
		);
	}
}




export default Setting;
