import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import customFonts from '../assets/fonts/customFonts';
import colors from '../assets/colors/colors';
import { AppLoading } from 'expo';
import { economiesMois, listUtilistations } from '../api/api';
import TimeSpanList from './TimeSpanList';


class ApplianceItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			fontsLoaded: false,
			timeSpans: [],
		};
	}

	async _loadFontsAsync() {
		await Font.loadAsync(customFonts);
		this.setState({ fontsLoaded: true });
	}

	componentDidMount() {
		this._economiesAppareil();
	}

	_economiesAppareil = () => {
		economiesMois(this.props.user, this.props.appliance.id_appareil)
			.then(data => this.economiesAppareil = data[0].eco)
			.then(this._plagesHoraires)
			.then(() => this._loadFontsAsync());
	}

	_plagesHoraires = () => {
		listUtilistations(this.props.user, this.props.appliance.id_appareil)
			.then(data => this.setState({ timeSpans: data }));
	}

	render() {
		if (this.state.fontsLoaded) {
			return (
				// <View>
				// 	<Text>
				// 		{this.props.appliance.categorie}{'\n'}
				// 		{this.props.appliance.genre}{'\n'}
				// 		{this.props.appliance.ref_appareil}{'\n'}
				// 		Consommation en veille : {this.props.appliance.conso_veille} kWh
				// 	</Text>
				// </View>
				<View style={styles.mainContainer}>
					<View style={styles.contentContainerView}>
						<View style={styles.contentTextView}>
							<Text style={styles.titleText}>
								{this.props.appliance.genre}
							</Text>
						</View>
						<View style={styles.economieContainer}>
							<View style={styles.contentTextView}>
								<Text style={styles.contentText}>
									Vous économisez
								</Text>
								<View style={styles.dataView}>
									<View style={styles.contentTextView}>
										<Text style={styles.contentText}>
											{(Number(this.economiesAppareil) /
												this.props.montant_kwh).toFixed(1)} kWh
										</Text>
									</View>
									<View style={styles.contentTextView}>
										<Text style={styles.contentText}>
											{Number(this.economiesAppareil).toFixed(2)} €
										</Text>
									</View>
								</View>
							</View>
						</View>
					</View>
					<View style={styles.horaireContainerView}>
						<Ionicons name='md-clock' size={30} color={'black'}/>
						<View style={styles.contentTextView}>
							<TimeSpanList
								timeSpans={this.state.timeSpans}
								id_appareil={this.props.appliance.id_appareil}
							/>
						</View>
					</View>
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
		flex: 1,
		flexDirection: 'row',
		margin: 5,
		backgroundColor: colors.white,
		borderRadius: 20,
	},
	contentContainerView: {
		flex: 2.5,
		flexDirection: 'column',
	},
	contentTextView: {
		flex: 1,
		margin: 10,
		alignItems: 'center',
	},
	titleText: {
		fontFamily: 'CircularStd-Black',
		fontSize: 18,
		color: colors.darkGreen,
		textAlign: 'center',
	},
	contentText: {
		fontFamily: 'CircularStd-Book',
		fontSize: 16,
		color: colors.lightGreen,
		textAlign: 'center',
	},
	economieContainer: {
		flex: 1,
		flexDirection: 'column',
		margin: 5,
		backgroundColor: colors.backgroundGreen,
		borderRadius: 15,
	},
	dataView: {
		flex: 1,
		flexDirection: 'row',
	},
	horaireContainerView: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		margin: 5,
		backgroundColor: colors.backgroundGreen,
		borderRadius: 15,
	},
	clockIcon: {
		
	},
});

const mapStateToProps = state => ({
	user: state.log.user,
});

export default connect(mapStateToProps)(ApplianceItem);
