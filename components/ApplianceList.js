import React, { Component } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import FilmItem from './FilmItem';
import { connect } from 'react-redux';

import ApplianceItem from './ApplianceItem';

class ApplianceList extends React.Component {
	render() {
		return (
			<FlatList
				data={this.props.appliances}
				keyExtractor={item => item.id.toString()}
				renderItem={({ item }) =>
					<ApplianceItem
						appliance={item}
					/>
				}
				onEndReachedThreshold={0.5}
				onEndReached={() => {
					console.log('test');
				}}
			/>
		);
	}
}

export default ApplianceList;
