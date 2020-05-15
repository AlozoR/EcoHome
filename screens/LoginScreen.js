import React from 'react';
import { View } from 'react-native';

import LoginForm from '../components/LoginForm';

class LoginScreen extends React.Component {
	handleLoginFormSubmit = values => {
		console.log(values);

		this.props.navigation.navigate('Home');
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
