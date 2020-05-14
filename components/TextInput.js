import React from 'react';
import { Input } from 'react-native';

class TextInput extends React.Component {
	render() {
		const { input, ...inputProps } = this.props;

		return (
			<Input
				{...inputProps}
				onChangeText={input.onChange}
				onBlur={input.onBlur}
				value={input.value.toString()}
			/>
		);
	}
}

export default TextInput;
