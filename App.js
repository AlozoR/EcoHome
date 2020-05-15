import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';

import store from './store/configureStore';

import Navigation from './navigation/Navigation';

class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<Navigation/>
			</Provider>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default App;
