import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { AppLoading } from 'expo';
import { connect } from 'react-redux';
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
		//console.log(values);

		return verifLogin(values)
			.then(data => {
				this.user = data[0];

				if (this.user.nb === '0') {
					// console.log('Connexion echouée');
					throw new SubmissionError({ _error: 'Connexion échouée' });
				} else {
					// console.log(this.user);
					const action = { type: 'LOG_USER', value: this.user.mail };
					this.props.dispatch(action);
					this.props.navigation.navigate('Home');
				}
			});
	};

	navigateInscription = () => {
		// console.log('nav');
		this.props.navigation.navigate('SignUp');
	};

	render() {
		if (!this.state.isReady) {
			return <AppLoading/>;
		}

		// const { handleSubmit } = this.props.children;

		// console.log(this.props.children);

		return (
			<View>
				<LoginForm onSubmit={this.handleLoginFormSubmit.bind(this)}/>
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

const mapStateToProps = state => ({
	user: state.log.user,
});

export default connect()(LoginScreen);
