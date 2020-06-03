import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../components/screens/HomeScreen';
import LoginScreen from '../components/screens/LoginScreen';
import SignUpScreen from '../components/screens/SignUpScreen';
import ListScreen from '../components/screens/ListScreen';
import NewApplianceScreen from '../components/screens/NewApplianceScreen';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

function MainStackNavigator() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName='Login'
				screenOptions={{
					gestureEnabled: true,
				}}>
				<Stack.Screen
					name='Login'
					component={LoginScreen}
					options={{
						title: 'Login',
					}}/>
				<Stack.Screen
					name='Home'
					component={HomeTabNavigator}
					options={{
						title: 'Home',
					}}/>
				<Stack.Screen
					name='SignUp' component={SignUpScreen}
					options={{
						title: 'SignUp',
					}}/>
				<Stack.Screen
					name='NewAppliance' component={NewApplianceScreen}
					options={{
						title: 'NewAppliance',
					}}/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

function HomeTabNavigator() {
	return (
		<Tab.Navigator
			initialRouteName='Home'
			screenOptions={{
				gestureEnabled: true,
			}}>
			<Tab.Screen
				name='Home'
				component={HomeScreen}
				options={{
					tabBarIcon: () => <Ionicons
						name='md-home'
						size={30}
						color={'black'}/>,
				}}
			/>
			<Tab.Screen
				name='DevicesList'
				component={ListScreen}
				options={{
					tabBarIcon: () => <Ionicons
						name='md-list'
						size={30}
						color={'black'}/>,
				}}
			/>
			<Tab.Screen
				name='Settings'
				component={HomeScreen}
				options={{
					tabBarIcon: () => <Ionicons
						name='md-settings'
						size={30}
						color={'black'}/>,
				}}
			/>
		</Tab.Navigator>
	);
}

export default MainStackNavigator;
