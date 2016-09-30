
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
	InteractionManager
} from 'react-native';

class Test extends React.Component {
	constructor(props) {
		super(props);
		console.log(props);
		this.state = { renderPlaceholderOnly: true };
	}

	componentDidMount() {
		InteractionManager.runAfterInteractions(() => {
			fetch('https://www.v2ex.com/api/nodes/all.json')
				.then((response) => response.json())
				.then(
				(responseData) => {
						this.setState({ renderPlaceholderOnly: false });
					console.log(responseData);
				});

        });
    }


	render() {
		if (this.state.renderPlaceholderOnly) {
			return (<View style={{ flex: 1, justifyContent: 'center' }}>
				<Text>Loading...</Text>
			</View>)
		}
		else
		{


		return (
			<View style={{ flex: 1, justifyContent: 'center' }}>
				<Text>Splash Page</Text>


				<TouchableOpacity >
					<Text style={{ color: '#55ACEE' }}>Open New Page</Text>
				</TouchableOpacity>


			
			</View>
		);

				}
	}
}



var styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#5151f4',
		padding: 10,

	},
	"Loginbanner": {
        "flex": 1,
        "height": 120,
		// "resizeMode": React.Image.resizeMode.stretch
    },
})

export default Test;
