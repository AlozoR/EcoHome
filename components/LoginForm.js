import React from 'react';
import { View, TextInput } from 'react-native';
import { reduxForm, Field } from 'redux-form';
import { Button, Text, Input } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import MyTextInput from './MyTextInput';
import { AppLoading } from 'expo';

class LoginForm extends React.Component {
	constructor(props) {
		super(props);
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

	render() {
		if (!this.state.isReady) {
			return <AppLoading/>;
		}

		return (
			<View>
				<Field
					name='login'
					label='Email'
					textContentType='emailAddress'
					autoCorrect={false}
					autoCapitalize='none'
					component={MyTextInput}
					icon='person'
				/>
				<Field
					name='password'
					label='Mot de passe'
					textContentType='password'
					secureTextEntry={true}
					autoCorrect={false}
					autoCapitalize='none'
					component={MyTextInput}
					icon='key'
				/>
				<Button full warning rounded onPress={this.props.handleSubmit}>
					<Text>Connexion</Text>
				</Button>
			</View>
		);
	}
}

export default reduxForm({
	form: 'login',
})(LoginForm);
