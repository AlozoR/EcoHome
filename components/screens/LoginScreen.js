import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { AppLoading } from 'expo';
import { SubmissionError } from 'redux-form';

import LoginForm from '../forms/LoginForm';
import { verifLogin } from '../../api/api';

class LoginScreen extends React.Component {
	constructor(props) {
		super(props);
		this.user = null;
		this.state = {
			isReady: false,
		};
	}

	async componentDidMount() {
		await Font.loadAsync({
			'Roboto': require('native-base/Fonts/Roboto.ttf'),
			'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
			...Ionicons.font,
		});
		this.setState({ isReady: true });
	}

	handleLoginFormSubmit = values => {
		// console.log(values);

		return verifLogin(values)
			.then(data => {
				this.user = data[0];

				if (this.user.nb === '0') {
					console.log('Connexion echouée');
					throw new SubmissionError({ username: 'erreur', _error: 'Connexion échouée' });
				} else {
					this.props.navigation.navigate('Home', { user: this.user.mail });
				}
			});
	};

	navigateInscription = () => {
		// console.log('nav');
		this.props.navigation.navigate('SignUp');
	};

	render() {
		// console.log('test2');
		if (!this.state.isReady) {
			return <AppLoading/>;
		}

		// console.log(this.props.children);

		return (
			<View>
				<LoginForm onSubmit={this.handleLoginFormSubmit}/>
				<View>
					<Button
						full
						warning
						rounded
						onPress={this.navigateInscription}>
						<Text>Créer un compte</Text>
					</Button>
				</View>
			</View>
		);
	}
}

export default LoginScreen;
