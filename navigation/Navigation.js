import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';

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
					component={HomeScreen}
					options={{
						title: 'Home',
					}}/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default MainStackNavigator;
