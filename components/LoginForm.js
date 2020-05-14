import React from 'react';
import { View, Button } from 'react-native';
import { reduxForm, Field } from 'redux-form';

import TextInput from './TextInput';

class LoginForm extends React.Component {
	render() {
		return (
			<View>
				<Field
					name='login'
					label='Email'
					textContentType='email'
					autoCorrect={false}
					autoCapitalize='none'
					component={TextInput}
					icon='person'
				/>
				<Field
					name='password'
					label='Mot de passe'
					textContentType='password'
					secureTextEntry={true}
			</View>
		);
	}
}
