import React from 'react';
import { View } from 'react-native';

import LoginForm from '../components/LoginForm';
import CreateScreen from '../components/Test';
import { verifLogin } from '../api/api';

class LoginScreen extends React.Component {
	handleLoginFormSubmit = values => {
		console.log(values);

		const user = verifLogin(values);
		if (user.mail === '') {
			console.log('Connexion echouée');
		} else {
			this.props.navigation.navigate('Home', { user: user.mail });
		}
	};

	render() {
		return (
			<View>
				<LoginForm onSubmit={this.handleLoginFormSubmit}/>
			</View>
		);
	}
}

export default LoginScreen;
