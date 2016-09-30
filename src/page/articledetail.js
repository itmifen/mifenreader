import React, { Component } from 'react';
import {
	StyleSheet,
	TextInput,
	View,
	Text,
	Navigator,
	TouchableOpacity,
	WebView,
	BackAndroid,
	InteractionManager
} from 'react-native';

import basestyles from '../style/basestyle';
import CommonHelper from '../common/commonhelper';

var commonHelper = new CommonHelper();
class ArticleDetail extends Component {

	constructor(props) {
		super(props);
	}


	render() {

	
			return (
				<View  style={basestyles.container}>
					<WebView
						source={{
							uri: this.props.data ? this.props.data.link.replace('www', 'm') : "",
							method: 'get'
						}}
						style={{ flex: 1 }}
						automaticallyAdjustContentInsets={false}
						javaScriptEnabled={true}
						domStorageEnabled={true}
						decelerationRate="normal"
						startInLoadingState={true}
						/>
				</View>

			)



	}
}
export default ArticleDetail;
