import React from 'react';
import { View } from 'react-native';
import { reduxForm, Field } from 'redux-form';
import { Button, Text } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { AppLoading } from 'expo';

import MyTextInput from './MyTextInput';
import { required, email, passwordsMustMatch } from './utility/validate';

class NewApplianceForm extends React.Component {
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

		return (
			<View>
				<Field
					name='mail'
					label='Email'
					textContentType='emailAddress'
					autoCorrect={false}
					autoCapitalize='none'
					validate={[required, email]}
					component={MyTextInput}
					icon='at'
				/>
				<Field
					name='tel'
					label='Téléphone'
					textContentType='telephoneNumber'
					autoCorrect={false}
					autoCapitalize='none'
					validate={[required]}
					component={MyTextInput}
					icon='phone-portrait'
				/>
				<Field
					name='mdp'
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
					name='mdp_confirm'
					label='Mot de passe'
					textContentType='password'
					secureTextEntry={true}
					autoCorrect={false}
					autoCapitalize='none'
					validate={[required, passwordsMustMatch]}
					component={MyTextInput}
					icon='key'
				/>
				{error && <Text>{error}</Text>}
				<Button full warning rounded onPress={this.props.handleSubmit}>
					<Text>{'S\'inscrire'}</Text>
				</Button>
			</View>
		);
	}
}

export default reduxForm({
	form: 'signUp',
})(NewApplianceForm);
