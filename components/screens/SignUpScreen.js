import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { AppLoading } from 'expo';

import SignUpForm from '../forms/SignUpForm';
import { inscription, existenceMail, existenceTel } from '../../api/api';
import { SubmissionError } from 'redux-form';

class SignUpScreen extends React.Component {
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

	handleSignInFormSubmit = values => {
		console.log(values);
		return existenceMail(values.mail)
			.then(data => {
				console.log(data);
				const nbUser = data.nb;
				console.log(nbUser);
				if (parseInt(nbUser) >= 1) {
					throw new SubmissionError({ mail: 'Email déjà enregistré' });
				}

				return existenceTel(values.tel)
					.then(data => {
						const nbUser = data.nb;
						if (parseInt(nbUser) >= 1) {
							throw new SubmissionError({ tel: 'Téléphone déjà enregistré' });
						}
						inscription(values);
						this.props.navigation.navigate('Login');

					});
			});
	};

	render() {
		// console.log('test');
		if (!this.state.isReady) {
			return <AppLoading/>;
		}

		return (
			<View>
				<SignUpForm onSubmit={this.handleSignInFormSubmit.bind(this)}/>
			</View>
		);
	}
}

export default SignUpScreen;
