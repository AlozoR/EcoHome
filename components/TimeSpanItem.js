import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import * as Font from 'expo-font';

import customFonts from '../assets/fonts/customFonts';
import colors from '../assets/colors/colors';
import { AppLoading } from 'expo';

import { joursUtilisation } from '../api/api';


class TimeSpanItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			fontsLoaded: false,
		};
	}

	async _loadFontsAsync() {
		await Font.loadAsync(customFonts);
		this.setState({ fontsLoaded: true });
	}

	componentDidMount() {
		this._joursUtilisations();
	}

	_joursUtilisations = () => {
		joursUtilisation(
			this.props.user,
			this.props.timeSpan.horaire_debut,
			this.props.timeSpan.horaire_fin,
			this.props.id_appareil,
		)
			.then(data => {
				this.jours = data;
			})
			.then(() => this._loadFontsAsync());
	};

	render() {
		if (this.state.fontsLoaded) {
			return (
				<View style={styles.mainContainer}>
					<View style={styles.contentView}>
						<Text style={styles.timeSpanText}>
							<Text style={{ ...styles.reccurenceText,
								color: this.jours.lundi === '0'
									? colors.grey
									: colors.darkGreen }}>
								L{' '}
							</Text>
							<Text style={{ ...styles.reccurenceText,
								color: this.jours.mardi === '0'
									? colors.grey
									: colors.darkGreen }}>
								M{' '}
							</Text>
							<Text style={{ ...styles.reccurenceText,
								color: this.jours.mercredi === '0'
									? colors.grey
									: colors.darkGreen }}>
								M{' '}
							</Text>
							<Text style={{ ...styles.reccurenceText,
								color: this.jours.jeudi === '0'
									? colors.grey
									: colors.darkGreen }}>
								J{' '}
							</Text>
							<Text style={{ ...styles.reccurenceText,
								color: this.jours.vendredi === '0'
									? colors.grey
									: colors.darkGreen }}>
								V{' '}
							</Text>
							<Text style={{ ...styles.reccurenceText,
								color: this.jours.samedi === '0'
									? colors.grey
									: colors.darkGreen }}>
								S{' '}
							</Text>
							<Text style={{ ...styles.reccurenceText,
								color: this.jours.dimanche === '0'
									? colors.grey
									: colors.darkGreen }}>
								D
							</Text>
						</Text>
					</View>
					<View style={styles.contentView}>
						<Text style={styles.timeSpanText}>
							{this.props.timeSpan.horaire_debut.substring(0, 5)} - {''}
							{this.props.timeSpan.horaire_fin.substring(0, 5)}
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
		height: 35,
		// backgroundColor: colors.darkGreen,
		flexDirection: 'column',
	},
	contentView: {
		flex: 1,
		alignItems: 'center',
	},
	reccurenceText: {
		fontFamily: 'CircularStd-Black',
		fontSize: 12,
	},
	timeSpanText: {
		fontFamily: 'CircularStd-Book',
		fontSize: 14,
		color: colors.lightGreen,
	},
});

const mapStateToProps = state => ({
	user: state.log.user,
});

export default connect(mapStateToProps)(TimeSpanItem);
