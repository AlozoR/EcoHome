import React from 'react';
import { connect } from 'react-redux';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import DropDownPicker from 'react-native-dropdown-picker';
import RNDateTimePicker from '@react-native-community/datetimepicker';

import { consoAppareil, listAppareilsGenre, listGenre, nouvelleUtilisation } from '../../api/api';
import colors from '../../assets/colors/colors';
import customFonts from '../../assets/fonts/customFonts';

// import NewApplianceForm from '../forms/NewApplianceForm';


class NewApplianceScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			fontsLoaded: false,
			genre: null,
			id_appareil: null,
			itemsAppareil: [],
			date: new Date(1598051700000),
			horaire_debut: null,
			horaire_fin: null,
			mode: 'time',
			show: false,
			recurrence: {
				'lundi': '0',
				'mardi': '0',
				'mercredi': '0',
				'jeudi': '0',
				'vendredi': '0',
				'samedi': '0',
				'dimanche': '0',
			},
		};
	}

	async _loadFontsAsync() {
		await Font.loadAsync(customFonts);
		this.setState({ fontsLoaded: true });
	}

	componentDidMount() {
		this._listGenre();
	}

	_listGenre = () => {
		listGenre()
			.then(data => {
				this.itemsGenre = data;
			})
			.then(() => this._loadFontsAsync());
	};

	_changeGenre = (item) => {
		const genre = item.value;
		listAppareilsGenre(genre)
			.then(data => {
				console.log(data);
				this.setState({ itemsAppareil: data, genre });
			});
	};

	_displayChoisirHoraire() {
		if (this.state.id_appareil != null && this.horaire_fin == null) {
			return (
				<View>
					<Text>
						Choisissez maintenant les horaires de début et fin où l{'\''}
						appareil sera débranché.
					</Text>
					<Button title='Choix des horaires' onPress={this._showTimepicker}/>
				</View>
			);
		}
	}

	_displayValider() {
		if (this.state.horaire_fin != null) {
			return (
				<View>
					<Text>
						{this.horaire_debut} - {this.horaire_fin}
					</Text>
					<Text style={styles.timeSpanText}>
						<Text style={{
							...styles.recurrenceText,
							color: this.state.recurrence.lundi === '0'
								? colors.grey
								: colors.darkGreen,
						}} onPress={() =>
							this.setState({
								recurrence: {
									...this.state.recurrence,
									lundi: this.state.recurrence.lundi === '1' ? '0' : '1',
								},
							})}>
							L{' '}
						</Text>
						<Text style={{
							...styles.recurrenceText,
							color: this.state.recurrence.mardi === '0'
								? colors.grey
								: colors.darkGreen,
						}} onPress={() =>
							this.setState({
								recurrence: {
									...this.state.recurrence,
									mardi: this.state.recurrence.mardi === '1' ? '0' : '1',
								},
							})}>
							M{' '}
						</Text>
						<Text style={{
							...styles.recurrenceText,
							color: this.state.recurrence.mercredi === '0'
								? colors.grey
								: colors.darkGreen,
						}} onPress={() =>
							this.setState({
								recurrence: {
									...this.state.recurrence,
									mercredi: this.state.recurrence.mercredi === '1' ? '0' : '1',
								},
							})}>
							M{' '}
						</Text>
						<Text style={{
							...styles.recurrenceText,
							color: this.state.recurrence.jeudi === '0'
								? colors.grey
								: colors.darkGreen,
						}} onPress={() =>
							this.setState({
								recurrence: {
									...this.state.recurrence,
									jeudi: this.state.recurrence.jeudi === '1' ? '0' : '1',
								},
							})}>
							J{' '}
						</Text>
						<Text style={{
							...styles.recurrenceText,
							color: this.state.recurrence.vendredi === '0'
								? colors.grey
								: colors.darkGreen,
						}} onPress={() =>
							this.setState({
								recurrence: {
									...this.state.recurrence,
									vendredi: this.state.recurrence.vendredi === '1' ? '0' : '1',
								},
							})}>
							V{' '}
						</Text>
						<Text style={{
							...styles.recurrenceText,
							color: this.state.recurrence.samedi === '0'
								? colors.grey
								: colors.darkGreen,
						}} onPress={() =>
							this.setState({
								recurrence: {
									...this.state.recurrence,
									samedi: this.state.recurrence.samedi === '1' ? '0' : '1',
								},
							})}>
							S{' '}
						</Text>
						<Text style={{
							...styles.recurrenceText,
							color: this.state.recurrence.dimanche === '0'
								? colors.grey
								: colors.darkGreen,
						}} onPress={() =>
							this.setState({
								recurrence: {
									...this.state.recurrence,
									dimanche: this.state.recurrence.dimanche === '1' ? '0' : '1',
								},
							})}>
							D
						</Text>
					</Text>
					<Button title={'Valider l\'appareil'} onPress={this._validerAppareil}/>
				</View>

			);
		}
	}

	_validerAppareil = () => {
		consoAppareil(this.state.id_appareil)
			.then(data => {
				const dateDebut = this.state.horaire_debut;
				const dateFin = this.state.horaire_fin;
				if (dateDebut > dateFin) {
					dateFin.setDate(dateFin.getDate() + 1);
				}
				const timeSpan = (dateFin - dateDebut) / 3600000;
				const eco = (timeSpan) * 30 / 7 * this.props.route.params.montant_kwh *
					data[0].conso_veille / 1000;
				const utilisation = {
					horaire_debut: this.horaire_debut,
					horaire_fin: this.horaire_fin,
					economie: eco,
					id_appareil: this.state.id_appareil,
					mail: this.props.user,
				};
				for (let jour in this.state.recurrence) {
					if (this.state.recurrence[jour] === '1') {
						nouvelleUtilisation(jour, utilisation);
					}
				}
			})
			.then(() => {
				const action = { type: 'RENDER_ALL' };
				this.props.dispatch(action);
				this.props.navigation.goBack();
			});
	};

	_onChange = (event, selectedDate) => {
		const currentDate = selectedDate || this.state.date;
		if (this.state.horaire_debut == null) {
			this.horaire_debut = currentDate.toISOString().substring(11, 19);
			this.setState({ date: currentDate, horaire_debut: currentDate });
		} else {
			this.horaire_fin = currentDate.toISOString().substring(11, 19);
			this.setState({
				date: currentDate,
				horaire_fin: currentDate,
				show: false,
			});
		}
	};

	_showMode = currentMode => {
		this.setState({ show: true });
		this.setState({ mode: currentMode });
	};

	_showTimepicker = () => {
		this._showMode('time');
	};

	render() {
		if (this.state.fontsLoaded) {
			return (
				<View style={styles.mainContainer}>
					<DropDownPicker
						items={this.itemsGenre}
						placeholder={'Selectionnez un type d\'appareil'}
						defaultIndex={0}
						containerStyle={{ height: 40 }}
						onChangeItem={item => this._changeGenre(item)}
					/>
					<DropDownPicker
						items={this.state.itemsAppareil}
						defaultNull={this.state.genre === null}
						placeholder='Selectionnez un appareil'
						defaultIndex={0}
						containerStyle={{ height: 40 }}
						onChangeItem={item => this.setState({ id_appareil: item.value })}
					/>
					{this._displayChoisirHoraire()}
					{this._displayValider()}
					{this.state.show && (
						<RNDateTimePicker
							testID="dateTimePicker"
							timeZoneOffsetInMinutes={0}
							value={this.state.date}
							mode={this.state.mode}
							is24Hour={true}
							display="default"
							onChange={this._onChange}
						/>)}
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
	recurrenceText: {
		fontFamily: 'CircularStd-Black',
		fontSize: 28,
		textAlign: 'center',
	},
	timeSpanText: {
		fontFamily: 'CircularStd-Book',
		fontSize: 14,
		color: colors.lightGreen,
	},
});

const mapStateToProps = state => ({
	user: state.log.user,
	render: state.render.render,
});

export default connect(mapStateToProps)(NewApplianceScreen);
