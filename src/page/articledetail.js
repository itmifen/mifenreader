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
		console.log(props);
		this.state = { renderPlaceholderOnly: true };
	}

	componentDidMount() {
		InteractionManager.runAfterInteractions(() => {
			this.setState({ renderPlaceholderOnly: false });
		});
		BackAndroid.addEventListener('hardwareBackPress', () => this._goback());

	}

	_goback() {
		const { navigator } = this.props;
		if (navigator) {
			navigator.pop();
		}
		return true;
	}


	render() {

		if (this.state.renderPlaceholderOnly) {
			return (<View>
				<Text>Loading...</Text>
			</View>)
		}
		else {
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
}
export default ArticleDetail;
