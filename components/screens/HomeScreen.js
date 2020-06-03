import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import * as Font from 'expo-font';

import { economiesMois, listUtilistations, moyenneMoisPrecedents, sommeMoisPrecedent } from '../../api/api';
import { AppLoading } from 'expo';
import customFonts from '../../assets/fonts/customFonts';
import colors from '../../assets/colors/colors';

class HomeScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			fontsLoaded: false,
			economiesMois: 0,
			moyenneMoisPrecedents: 0,
			ecoActuelle: 0,
			totalEco: 0,
		};
	}

	async _loadFontsAsync() {
		await Font.loadAsync(customFonts);
		this.setState({ fontsLoaded: true });
	}

	componentDidMount() {
		this._economiesMois();
		this._moyenneMoisPrecedents();
	}

	_test = () => {
		listUtilistations(this.props.user)
			.then(data => {
				let eco = 0;
				data.forEach(element => {
					const dataFin = new moment('2013-02-08 ' + element.horaire_fin);
					const dateDebut = new moment('2013-02-08 ' + element.horaire_debut);
					if (dateDebut > dataFin) {
						dataFin.dayOfYear(dataFin.dayOfYear()).valueOf();
					}
					const timeSpan = (dataFin - dateDebut) / 3600000;
					eco += (timeSpan) *
						(parseInt(element.jour, 10) / 7) * 30 * element.montant_kwh *
						element.conso_veille / 1000;
				});
				this.setState({ economiesMois: eco });
			});
	};

	_economiesMois = () => {
		economiesMois(this.props.user)
			.then(data => this.setState({ economiesMois: data[0].eco }))
			.then(this._ecoActuelle)
			.then(this._totalEco)
			.then(() => this._loadFontsAsync());
	};

	_moyenneMoisPrecedents = () => {
		moyenneMoisPrecedents(this.props.user)
			.then(data => this.setState({ moyenneMoisPrecedents: data[0].moyenne }));
	};

	_ecoActuelle = () => {
		const p = moment().date() / moment().daysInMonth();
		this.setState({ ecoActuelle: p * this.state.economiesMois });
	};

	_totalEco = () => {
		sommeMoisPrecedent(this.props.user)
			.then(data => {
				this.setState({ totalEco: Number(this.state.ecoActuelle) + Number(data[0].eco) });
			});
	};

	render() {
		if (this.state.fontsLoaded) {
			return (
				<View style={styles.mainContainer}>
					<View style={styles.headerView}>
						<Text style={styles.headerText}>
							Tableau de bord
						</Text>
					</View>
					<View style={styles.titleView}>
						<Text style={styles.contentText}>
							Total économisé :
						</Text>
					</View>
					<View style={styles.contentView}>
						<Text style={styles.contentText}>
							{Number(this.state.totalEco).toFixed(2)} €
						</Text>
					</View>
					<View style={styles.titleView}>
						<Text style={styles.contentText}>
							Économies sur le mois :
						</Text>
					</View>
					<View style={styles.contentView}>
						<Text style={styles.contentText}>
							{Number(this.state.economiesMois).toFixed(2)} €
						</Text>
					</View>
					<View style={styles.titleView}>
						<Text style={styles.contentText}>
							Moyenne des mois précédents :
						</Text>
					</View>
					<View style={styles.contentView}>
						<Text style={styles.contentText}>
							{Number(this.state.moyenneMoisPrecedents).toFixed(2)} €
						</Text>
					</View>
					<View style={styles.titleView}>
						<Text style={styles.contentText}>
							Économisé ce mois-ci :
						</Text>
					</View>
					<View style={styles.contentView}>
						<Text style={styles.contentText}>
							{Number(this.state.ecoActuelle).toFixed(2)} €
						</Text>
					</View>
					<View style={styles.footerView}>
						<Text style={styles.footerText}>
							Vous économisez en moyenne l{'\''}équivalent de{' '}
							{(Number(this.state.moyenneMoisPrecedents) / 6.5).toFixed(1)}
							{' '}kebab par mois !
						</Text>
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
		backgroundColor: colors.backgroundGreen,
		flex: 1,
		flexDirection: 'column',
	},
	headerView: {
		flex: 1.5,
		marginTop: 10,
		alignItems: 'center',
	},
	headerText: {
		fontFamily: 'CircularStd-Black',
		fontSize: 30,
		color: colors.darkGreen,
	},
	titleView: {
		flex: 1,
		marginTop: 15,
		marginLeft: 15,
	},
	contentView: {
		flex: 1,
		marginTop: 5,
		alignItems: 'center',
	},
	contentText: {
		fontFamily: 'CircularStd-Book',
		fontSize: 24,
		color: colors.lightGreen,
	},
	footerView: {
		flex: 1.5,
		marginTop: 15,
		marginBottom: 15,
		marginLeft: 30,
		marginRight: 30,
		alignItems: 'center',
	},
	footerText: {
		fontFamily: 'CircularStd-Black',
		fontSize: 20,
		color: colors.darkGreen,
		textAlign: 'center',
	},
});

const mapStateToProps = state => ({
	user: state.log.user,
});

export default connect(mapStateToProps)(HomeScreen);
