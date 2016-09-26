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
	Image
} from 'react-native';

import styles from '../style/aritemstyle'

class Aritem extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return(
			<TouchableOpacity
				onPress={(e)=>{ this.props.onSelect(this.props.itemdata) }}
				>

				<View 	style={styles.atitemview}>

					<View style={styles.atitemleftview}>


						<View style={styles.atitemtitleview}>

							<Text style={styles.atitemtitle}>
								{this.props.itemdata?this.props.itemdata.title:""}

							</Text>

						</View>

						<View style={styles.atitemdescview}>


							<Text style={styles.atitemdesctext}>
								{this.props.itemdata?this.props.itemdata.desc:""}

							</Text>

						</View>


						<View style={styles.atitemdate}>


							<Text style={styles.atitemdatetext}>
								{this.props.itemdata?this.props.itemdata.createdate:''}

							</Text>

						</View>

					</View>

					<View style={styles.atitemrightview}>

						<Image
						source={require('../image/atitem.png')}
						style={styles.atitemimage} />

				</View>
			</View>


		</TouchableOpacity>

		);
	}
}

export default Aritem;
