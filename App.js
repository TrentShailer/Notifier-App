import "react-native-gesture-handler";
import React, { Component, useRef } from "react";
import NetInfo from "@react-native-community/netinfo";
import Palette from "./Utilities/Palette";
import FirstLaunch1 from "./Views/FirstLaunch1";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import FirstLaunch2 from "./Views/FirstLaunch2";
import NoInternetModal from "./Views/NoInternetModal";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Home from "./Views/Home";

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
});

class MainStackScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			NetInfoListener: () => {},
			apiID: "",
			firstLaunch: false,
		};
	}
	registerForPushNotificationsAsync = async () => {
		if (Constants.isDevice) {
			const { status: existingStatus } =
				await Notifications.getPermissionsAsync();
			let finalStatus = existingStatus;
			if (existingStatus !== "granted") {
				const { status } =
					await Notifications.requestPermissionsAsync();
				finalStatus = status;
			}
			if (finalStatus !== "granted") {
				alert("Failed to get push token for push notification!");
				return;
			}
			const token = (await Notifications.getExpoPushTokenAsync()).data;
			axios
				.post("http://192.168.9.101:3005/user/create", {
					pushToken: token,
				})
				.then(async (res) => {
					this.setState({ apiID: res.data.apiID });
					try {
						await AsyncStorage.setItem("apiID", res.data.apiID);
					} catch (err) {
						console.log(err);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			alert("Must use physical device for Push Notifications");
		}

		if (Platform.OS === "android") {
			Notifications.setNotificationChannelAsync("default", {
				name: "default",
				importance: Notifications.AndroidImportance.MAX,
				vibrationPattern: [0, 250, 250, 250],
				lightColor: "#FF231F7C",
			});
		}
	};

	async componentDidMount() {
		var firstLaunch = await AsyncStorage.getItem("firstLaunch");
		firstLaunch = null;
		if (firstLaunch === null) {
			await AsyncStorage.setItem("firstLaunch", "false");
			navigationRef.current?.navigate("FirstLaunch1");
		}
		const netInfoListener = NetInfo.addEventListener(
			async (networkState) => {
				if (!networkState.isConnected) {
					this.props.navigation.navigate("NoInternet");
				} else {
					this.props.navigation.navigate("Main");
					try {
						var apiID = await AsyncStorage.getItem("apiID");
						if (apiID === null) {
							return this.registerForPushNotificationsAsync();
						}
						this.setState({ apiID: apiID });
					} catch (err) {
						console.log(err);
					}
				}
			}
		);

		this.setState({ NetInfoListener: netInfoListener });
	}
	componentWillUnmount() {
		this.state.NetInfoListener();
	}
	render() {
		return (
			<MainStack.Navigator
				initialRouteName="Home"
				screenOptions={{
					headerStyle: {
						backgroundColor: Palette.shades.grey[8],
					},
					headerTintColor: Palette.shades.grey[0],
				}}>
				<MainStack.Screen
					name="FirstLaunch1"
					component={FirstLaunch1}
					options={{ title: "Welcome", headerLeft: null }}
				/>
				<MainStack.Screen
					name="FirstLaunch2"
					component={FirstLaunch2}
					options={{ title: "Welcome" }}
				/>
				<MainStack.Screen
					name="Home"
					component={Home}
					options={{ title: "Messages", headerLeft: null }}
				/>
			</MainStack.Navigator>
		);
	}
}

const navigationRef = React.createRef();

export default function App() {
	return (
		<NavigationContainer ref={navigationRef}>
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
