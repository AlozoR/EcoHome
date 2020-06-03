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
import { AppLoading } from 'expo';

import ApplianceList from '../ApplianceList';
import { listAppareils, offreElec } from '../../api/api';
import colors from '../../assets/colors/colors';

class ListScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isReady: false,
			appliances: [],
		};
	}

	componentDidMount() {
		this._loadAppliances();
		this._offreElec();
	}

	_loadAppliances = () => {
		listAppareils(this.props.user)
			.then(data => {
				this.setState({ appliances: data });
			});
	};

	_navigateNouvelAppareil = () => {
		this.props.navigation.navigate('NewAppliance', { montant_kwh: this.montant_kwh });
	}


	_offreElec = () => {
		offreElec(this.props.user)
			.then(data => {
				this.montant_kwh = data[0].montant_kwh;
				this.setState({ isReady: true });
			});
	};

	render() {
		if (this.state.isReady) {
			return (
				<View style={styles.mainContainer}>
					<Button title='Load appliances' onPress={this._loadAppliances}/>
					<View style={{}}>
						<ApplianceList
							appliances={this.state.appliances}
							montant_kwh={this.montant_kwh}
						/>
					</View>
					<TouchableOpacity
						style={styles.buttonOpacity}
						onPress={this._navigateNouvelAppareil}>
						<Ionicons name='md-add' size={40} color={'black'}/>
					</TouchableOpacity>
				</View>
			);
		} else {
			return (
				<AppLoading/>
			);
		}
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
