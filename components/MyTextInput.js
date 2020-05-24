import React from 'react';
import { StyleSheet } from 'react-native';
import { Input, Text, Item, Icon, Label } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { AppLoading } from 'expo';

import FieldWrapper from './FieldWrapper';

class MyTextInput extends React.Component {
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
		const { input, meta, label, ...inputProps } = this.props;
		console.log(this.props);

		if (!this.state.isReady) {
			return <AppLoading/>;
		}

		return (
			<FieldWrapper {...this.props}>
				<Item error={meta.touched && meta.error}>
					{this.props.icon && (
						<Icon
							name={this.props.icon}
							style={meta.active
								? styles.iconActive
								: styles.iconInactive}/>
					)}
					<Input
						{...inputProps}
						placeholder={label}
						onChangeText={input.onChange}
						onBlur={input.onBlur}
						onFocus={input.onFocus}
						value={input.value.toString()}
					/>
				</Item>
			</FieldWrapper>
		);
	}
}

const styles = StyleSheet.create({
	iconActive: {
		color: '#8000ff',
	},
	iconInactive: {
		color: '#000000',
	},
});

export default MyTextInput;
