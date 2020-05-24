import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { reduxForm, Field } from 'redux-form';

// import Styles from '../../Themes/Containers/Create';
// import FormStyles from '../../Themes/Containers/Form';

let CreateScreen = class CreateScreen extends Component {
	onSubmit = (formData) => {
		console.log('formData', formData);
	};

	renderInput = ({ input }) => {
		return <TextInput /*style={FormStyles.input}*/ onChange={input.onChange} {...input} />;
	};

	render() {
		const { handleSubmit } = this.props;

		return (
			<View /*style={Styles.container}*/>
				<Text /*style={FormStyles.label}*/>Nom du support</Text>
				<View /*style={FormStyles.inputContainer}*/>
					<Field name='name' component={this.renderInput}/>
				</View>
				<TouchableOpacity onPress={handleSubmit(this.onSubmit)}>
					<Text>Submit</Text>
				</TouchableOpacity>
			</View>
		);
	}
};

CreateScreen = reduxForm({ form: 'create' })(CreateScreen);

export default CreateScreen;
