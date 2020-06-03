import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';

import ApplianceItem from './ApplianceItem';
import { offreElec } from '../api/api';
import { AppLoading } from 'expo';

class ApplianceList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isReady: false,
		};
	}

	componentDidMount() {
		this._offreElec();
	}

	_offreElec = () => {
		offreElec(this.props.user)
			.then(data => {
				this.montant_kwh = data[0].montant_kwh;
				this.setState({ isReady: true });
			});
	};

	render() {
		if (this.state.isReady) {
			return (
				<FlatList
					data={this.props.appliances}
					keyExtractor={item => item.id_appareil}
					renderItem={({ item }) =>
						<ApplianceItem
							appliance={item}
							montant_kwh={this.montant_kwh}
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

export default connect(mapStateToProps)(ApplianceList);
