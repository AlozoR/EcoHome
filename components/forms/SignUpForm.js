import React from 'react';
import { View } from 'react-native';
import { reduxForm, Field } from 'redux-form';
import { Button, Text } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { AppLoading } from 'expo';

import MyTextInput from './MyTextInput';
import { required, email, passwordsMustMatch } from './utility/validate';

class SignUpForm extends React.Component {
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
					validate={[required/*, email*/]}
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
					validate={[required]}
					component={MyTextInput}
					icon='key'
				/>
				<Field
					name='password_confirm'
					label='Mot de passe'
					textContentType='password'
					secureTextEntry={true}
					autoCorrect={false}
					autoCapitalize='none'
					validate={[required, passwordsMustMatch]}
					component={MyTextInput}
					icon='key'
				/>
				<Button full warning rounded onPress={this.props.handleSubmit}>
					<Text>S'inscrire</Text>
				</Button>
			</View>
		);
	}
}

export default reduxForm({
	form: 'signUp',
})(SignUpForm);
