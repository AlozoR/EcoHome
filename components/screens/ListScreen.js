import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	FlatList,
	Button,
	TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import Store from '../../store/configureStore';
import { Ionicons } from '@expo/vector-icons';

import ApplianceList from '../ApplianceList';
import { listAppareils } from '../../api/api';
import colors from '../../assets/colors/colors';

class ListScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			appliances: [],
		};
	}

	_loadAppliances = () => {
		listAppareils(this.props.user)
			.then(data => {
				this.setState({ appliances: data });
			});
	};

	_navigateNouvelAppareil = () => {
		this.props.navigation.navigate('NewAppliance');
	}

	render() {
		return (
			<View style={styles.mainContainer}>
				<View style={{}}>
					<Button title={'Load appliances'} onPress={this._loadAppliances}/>
				</View>
				<View style={{}}>
					<ApplianceList
						appliances={this.state.appliances}
					/>
				</View>
				<TouchableOpacity
					style={styles.buttonOpacity}
					onPress={this._navigateNouvelAppareil}>
					<Ionicons name='md-add' size={40} color={'black'}/>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	mainContainer: {
		backgroundColor: colors.backgroundGreen,
		flex: 1,
		flexDirection: 'column',
	},
	buttonOpacity: {
		position: 'absolute',
		width: 70,
		height: 70,
		right: 30,
		bottom: 30,
		borderRadius: 35,
		backgroundColor: colors.white,
		borderWidth: 1,
		borderColor: colors.black,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

const mapStateToProps = state => ({
	user: state.log.user,
});

export default connect(mapStateToProps)(ListScreen);
