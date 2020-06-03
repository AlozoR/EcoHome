import React from 'react';
import { connect } from 'react-redux';
import { Button, StyleSheet, Text, View } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import customFonts from '../../assets/fonts/customFonts';
import DropDownPicker from 'react-native-dropdown-picker';
import RNDateTimePicker from '@react-native-community/datetimepicker';

import { listAppareilsGenre, listGenre } from '../../api/api';
import colors from '../../assets/colors/colors';
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
	}

	_displayValider() {
		if (this.state.id_appareil != null) {
			return (
				<Button title='Valider' onPress={this._showTimepicker}/>
			);
		}
	}

	_validerAppareil = () => {

	}

	_onChange = (event, selectedDate) => {
		const currentDate = selectedDate || this.state.date;
		this.setState({ show: false });
		this.setState({ date: currentDate });
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
			console.log(this.state.date);
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
					{this._displayValider()}
					{/*<View>*/}
					{/*	<Button onPress={this._showTimepicker} title="Show time picker!" />*/}
					{/*</View>*/}
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
});

const mapStateToProps = state => ({
	user: state.log.user,
});

export default connect(mapStateToProps)(NewApplianceScreen);
