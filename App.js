import "react-native-gesture-handler";
import React, { useEffect } from "react";
import Palette from "./Utilities/Palette";
import FirstLaunch1 from "./Views/FirstLaunch1";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import FirstLaunch2 from "./Views/FirstLaunch2";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Home from "./Views/Home";
import EditSender from "./Views/EditSender";
import { navigationRef } from "./Utilities/Store";
import { Provider } from "react-redux";
import Loading from "./Views/Loading";

import store from "./Utilities/Store";

import { useDispatch } from "react-redux";
import { assignApiID, assignSenders } from "./Utilities/Slices";

const MainStack = createStackNavigator();
const FirstStack = createStackNavigator();
const RootStack = createStackNavigator();

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
});

async function registerForPushNotifications(apiID) {
	if (Constants.isDevice) {
		const { status: existingStatus } =
			await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;
		if (existingStatus !== "granted") {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}
		if (finalStatus !== "granted") {
			return;
		}
		const token = (await Notifications.getExpoPushTokenAsync()).data;
		axios
			.post("http://192.168.9.101:3005/user/registerPushToken", {
				pushToken: token,
				apiID: apiID,
			})
			.then(async (res) => {
				if (res.data.error) alert(res.data.error);
			})
			.catch((err) => {
				console.log(err);
				alert("Failed to register push token.");
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
}

function FirstLaunchStack(props) {
	useEffect(() => {
		return () => {};
	});
	return (
		<FirstStack.Navigator
			initialRouteName="FirstLaunch1"
			screenOptions={{
				headerStyle: {
					backgroundColor: Palette.shades.grey[8],
				},
				headerTintColor: Palette.shades.grey[0],
			}}>
			<FirstStack.Screen
				name="FirstLaunch1"
				component={FirstLaunch1}
				options={{ title: "Welcome", headerLeft: null }}
			/>
			<FirstStack.Screen
				name="FirstLaunch2"
				component={FirstLaunch2}
				options={{ title: "Welcome" }}
			/>
			<FirstStack.Screen
				name="EditSender"
				component={EditSender}
				options={{ title: "Edit Sender" }}
			/>
		</FirstStack.Navigator>
	);
}

function MainStackComponent(props) {
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
				name="EditSender"
				component={EditSender}
				options={{ title: "Edit Sender" }}
			/>
			<MainStack.Screen
				name="Home"
				component={Home}
				options={{ title: "Messages", headerLeft: null }}
			/>
		</MainStack.Navigator>
	);
}

function InnerApp() {
	const dispatch = useDispatch();
	useEffect(() => {
		async function GetFirstLaunch() {
			var apiID = await AsyncStorage.getItem("apiID");
			if (apiID === null) {
				axios
					.post("http://192.168.9.101:3005/user/create")
					.then((res) => {
						if (res.data.error) return alert(res.data.error);
						var apiID = res.data.apiID;
						dispatch(assignApiID(apiID));
						AsyncStorage.setItem("apiID", apiID);
						registerForPushNotifications(apiID);
						navigationRef.current?.navigate("FirstLaunch");
					})
					.catch((err) => {
						alert("Failed to create user");
					});
			} else {
				dispatch(assignApiID(apiID));
				axios
					.post("http://192.168.9.101:3005/sender/get/all", {
						apiID: apiID,
					})
					.then((res) => {
						if (res.data.error) return alert(res.data.error);
						dispatch(assignSenders(res.data.senders));
						navigationRef.current?.navigate("Main");
					})
					.catch((err) => {
						alert("Failed to fetch senders.");
					});
			}
		}
		GetFirstLaunch();
	});
	return (
		<NavigationContainer ref={navigationRef}>
			<RootStack.Navigator initialRouteName="Loading" mode="modal">
				<RootStack.Screen
					name="Main"
					component={MainStackComponent}
					options={{ headerShown: false }}
				/>
				<RootStack.Screen
					name="FirstLaunch"
					component={FirstLaunchStack}
					options={{ headerShown: false }}
				/>
				<RootStack.Screen
					name="Loading"
					component={Loading}
					options={{ headerShown: false }}
				/>
			</RootStack.Navigator>
		</NavigationContainer>
	);
}

export default function App() {
	return (
		<Provider store={store}>
			<InnerApp />
		</Provider>
	);
}
