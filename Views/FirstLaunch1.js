import React, { Component } from "react";
import { Text, Animated, Easing, StyleSheet, View } from "react-native";
import Palette from "../Utilities/Palette";
import CustomButton from "../Utilities/CustomButton";

import Svg, { Path } from "react-native-svg";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default class FirstLaunch1 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			apiID: "",
			rotateZ: new Animated.Value(0),
		};
	}
	spinner = () => {
		Animated.loop(
			Animated.timing(this.state.rotateZ, {
				toValue: 1,
				duration: 750,
				easing: Easing.linear,
				useNativeDriver: true,
			})
		).start();
	};

	async componentDidMount() {
		this.spinner();

		var waitForApiID = setInterval(async () => {
			var apiID = await AsyncStorage.getItem("apiID");
			if (apiID !== null) {
				this.setState({ apiID: apiID });
				clearInterval(waitForApiID);
			}
		}, 1000);
	}
	render() {
		return (
			<View style={styles.mainView}>
				<View style={styles.mainView}>
					<Text
						style={{
							color: Palette.shades.grey[0],
							fontSize: 20,
							marginTop: 300,
						}}>
						Your ID
					</Text>
					{this.state.apiID !== "" ? (
						<Text
							style={{
								color: Palette.shades.grey[0],
								fontSize: 40,
								marginTop: -10,
							}}>
							{this.state.apiID}
						</Text>
					) : (
						<Animated.View
							style={{
								transform: [
									{
										rotateZ: this.state.rotateZ.interpolate(
											{
												inputRange: [0, 1],
												outputRange: ["0deg", "360deg"],
											}
										),
									},
								],
							}}>
							<Svg width="48" height="48" viewBox="0 0 24 24">
								<Path
									fill={Palette.shades.grey[0]}
									d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"
								/>
							</Svg>
						</Animated.View>
					)}

					<Text
						style={{
							color: Palette.shades.grey[0],
							marginLeft: 50,
							marginRight: 50,
							marginTop: 100,
							textAlign: "center",
						}}>
						This ID is used to receive messages and can be found at
						any time on your profile.
					</Text>
				</View>
				<View style={{ width: "100%" }}>
					<CustomButton
						onPress={() =>
							this.props.navigation.navigate("FirstLaunch2")
						}
						color={Palette.shades.green[5]}
						text={"Continue"}
					/>
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	mainView: {
		backgroundColor: Palette.shades.grey[9],
		width: "100%",
		height: "100%",
		flex: 1,
		alignItems: "center",
	},
});
