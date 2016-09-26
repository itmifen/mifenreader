
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


//import Login from './Login';


class Test extends React.Component {

	 componentDidMount(){


InteractionManager.runAfterInteractions(() => {

         // BackAndroid.addEventListener('hardwareBackPress', () => Actions.pop());

           fetch('https://www.v2ex.com/api/nodes/all.json')
        .then((response) => response.json())
        .then(
          (responseData) => {
            console.log(responseData);
          });

        });



    }


	render() {
		return (
			<View>
				<Text>Splash Page</Text>


				<TouchableOpacity >
					<Text style={{ color: '#55ACEE' }}>Open New Page</Text>
				</TouchableOpacity>


				<View>
                    <Image style={styles.Loginbanner}   source={{
						uri: 'http://img.szbjh.com/1468822334-46614b35-8355-4cdf-a4be-ca201bfc08f6-800-800?imageView2/2/w/400',
					}}/>
                </View>



				<View>
                    <Image style={styles.Loginbanner}  source={{
						uri: 'http://img.szbjh.com/1465177507-2426998b-8d09-48df-bf92-285323882aaf-800-800?imageView2/2/w/400',
					}}/>
                </View>



				<View>
                    <Image style={styles.Loginbanner}  source={{
						uri: 'http://img.szbjh.com/1468822091-345ff1dd-a83a-4cf4-85b4-dcde9a690a60-800-800?imageView2/2/w/400',
					}}/>
                </View>



				<View>
                    <Image style={styles.Loginbanner}  source={{
						uri: 'http://img.szbjh.com/1470622341-9c80c892-4c37-43bf-ac93-dec4d6582795-800-800?imageView2/2/w/400',
					}}/>
                </View>



				<View>
                    <Image style={styles.Loginbanner}  source={{
						uri: 'http://img.szbjh.com/1469082318-9614c0db-e19f-488a-b30c-36483cb66ecd-800-800?imageView2/2/w/400',
					}}/>
                </View>

			</View>
		);
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
