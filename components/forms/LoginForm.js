import React from 'react';
import { View } from 'react-native';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { Button, Text } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import MyTextInput from './MyTextInput';
import { AppLoading } from 'expo';
import { required, email } from './utility/validate';

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

		const { error } = this.props;

		// console.log(this.props.handleSubmit);
		// console.log(this.props.onSubmit);

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
					icon='at'
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
				{error && <Text>{error}</Text>}
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
