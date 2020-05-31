import React from 'react';
import { StyleSheet, View, Text, TextInput, FlatList } from 'react-native';
import { connect } from 'react-redux';
import Store from '../../store/configureStore';

class HomeScreen extends React.Component {
	render() {
		return (
			<View style={{ flex: 1 }}>
				<View style={{ flex: 1 }}>
					<Text>{this.props.user} est connecté</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({});

const mapStateToProps = state => ({
	user: state.log.user,
});

export default connect(mapStateToProps)(HomeScreen);
