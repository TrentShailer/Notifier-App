import "react-native-gesture-handler";
import React, { Component } from "react";
import NetInfo from "@react-native-community/netinfo";
import Palette from "./Utilities/Palette";
import FirstLaunch1 from "./Views/FirstLaunch1";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import FirstLaunch2 from "./Views/FirstLaunch2";
import NoInternetModal from "./Views/NoInternetModal";
import { View } from "react-native";

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

class MainStackScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			NetInfoListener: () => {},
		};
	}
	componentDidMount() {
		const netInfoListener = NetInfo.addEventListener((networkState) => {
			if (!networkState.isConnected) {
				this.props.navigation.navigate("NoInternet");
			} else {
				this.props.navigation.navigate("Main");
			}
		});

		this.setState({ NetInfoListener: netInfoListener });
	}
	componentWillUnmount() {
		this.state.NetInfoListener();
	}
	render() {
		return (
			<MainStack.Navigator
				initialRouteName="FirstLaunch1"
				screenOptions={{
					headerStyle: {
						backgroundColor: Palette.shades.grey[8],
					},
					headerTintColor: Palette.shades.grey[0],
				}}>
				<MainStack.Screen
					name="FirstLaunch1"
					component={FirstLaunch1}
					options={{ title: "Welcome" }}
				/>
				<MainStack.Screen
					name="FirstLaunch2"
					component={FirstLaunch2}
					options={{ title: "Welcome" }}
				/>
			</MainStack.Navigator>
		);
	}
}

export default function App() {
	return (
		<NavigationContainer>
			<RootStack.Navigator mode="modal">
				<RootStack.Screen
					name="Main"
					component={MainStackScreen}
					options={{ headerShown: false }}
				/>
				<RootStack.Screen
					name="NoInternet"
					component={NoInternetModal}
					options={{ headerShown: false }}
				/>
			</RootStack.Navigator>
		</NavigationContainer>
	);
}
