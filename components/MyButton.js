import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { AppLoading } from 'expo';

class MyButton extends React.Component {
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

	navigateCreateAccount = () => {
		this.props.navigation.navigate(this.props.screenRoute);
	}

	render() {
		if (!this.state.isReady) {
			return <AppLoading/>;
		}

		return (
			<View>
				<Button full warning rounded onPress={this.navigateCreateAccount}>
					<Text>{this.props.textContent}</Text>
				</Button>
			</View>
		);
	}
}
