import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { AppLoading } from 'expo';

import SignUpForm from '../forms/SignUpForm';
import { inscription, existenceUtilisateur } from '../../api/api';

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


	};

	render() {
		// console.log('test');
		if (!this.state.isReady) {
			return <AppLoading/>;
		}

		return (
			<View>
				<SignUpForm onSubmit={this.handleSignInFormSubmit}/>
			</View>
		);
	}
}

export default SignUpScreen;
