import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { Input, Form } from 'native-base';

import FieldWrapper from '../forms/FieldWrapper';

class HomeScreen extends React.Component {
	render() {
		return (
			<View>
				<View style={{ flex: 1 }}>
					<Text>{this.props.route.params.user} est connecté</Text>
				</View>
				<View style={{ flex: 1 }}>
					<TextInput placeholder='test'/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({});

export default HomeScreen;
