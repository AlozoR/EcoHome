import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { AppLoading } from 'expo';

class FieldWrapper extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isReady: false,
		};
	}

	async componentDidMount() {
		console.log(this.props.children.props);
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
			<View style={[styles.inputContainer,
				this.props.meta.touched && this.props.meta.error
					? styles.inputContainerInvalid
					: {}]}>
				{this.props.children}
				{this.props.meta.touched && this.props.meta.error && (
					<Text style={styles.error}>{this.props.meta.error}</Text>
				)}

				{this.props.meta.warning && (
					<Text style={styles.warning}>
						{this.props.meta.warning}
					</Text>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	inputContainer: {
		marginTop: 5,
		marginBottom: 5,
	},
	inputContainerInvalid: {},
	error: {
		fontSize: 9,
		fontWeight: 'bold',
		fontStyle: 'italic',
		paddingTop: 3,
		paddingBottom: 6,
		color: '#ff0000',
	},
	warning: {
		fontSize: 9,
		fontWeight: 'bold',
		fontStyle: 'italic',
		paddingTop: 3,
		paddingBottom: 6,
		color: '#ff8000',
	},
});

export default FieldWrapper;
