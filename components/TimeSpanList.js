import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';

import TimeSpanItem from './TimeSpanItem';
import { AppLoading } from 'expo';

class TimeSpanList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isReady: true,
		};
	}

	componentDidMount() {	}

	render() {
		if (this.state.isReady) {
			return (
				<FlatList
					data={this.props.timeSpans}
					keyExtractor={item => item.horaire_debut + item.horaire_fin}
					renderItem={({ item }) =>
						<TimeSpanItem
							timeSpan={item}
							id_appareil={this.props.id_appareil}
						/>
					}
				/>
			);
		} else {
			return (
				<AppLoading/>
			);
		}
	}
}

const mapStateToProps = state => ({
	user: state.log.user,
});

export default connect(mapStateToProps)(TimeSpanList);
