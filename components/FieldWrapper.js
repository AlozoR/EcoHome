import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

class FieldWrapper extends React.Component {
	render() {
		return (
			<View>
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

const styles = StyleSheet.create();

export default FieldWrapper;
