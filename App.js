import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Palette from './Utilities/Palette';
import FirstLaunch1 from './Views/FirstLaunch1';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FirstLaunch2 from './Views/FirstLaunch2';

const Stack = createStackNavigator();

export default function App() {
	return (
	<NavigationContainer>
	  <Stack.Navigator initialRouteName="FirstLaunch1" screenOptions={{ headerStyle: { backgroundColor: Palette.shades.grey[8]}, headerTintColor: Palette.shades.grey[0] }}>
		<Stack.Screen
		  name="FirstLaunch1"
					component={FirstLaunch1}
				options={{title: "Welcome"}}
				/>
				<Stack.Screen
		  name="FirstLaunch2"
					component={FirstLaunch2}
				options={{title: "Welcome"}}
		/>
	  </Stack.Navigator>
	</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	mainView: {
		backgroundColor: Palette.shades.grey[9],
	},

});

