import React, { Component } from "react";
import { Text, Animated, Easing, StyleSheet, View } from "react-native";
import Palette from "../Utilities/Palette";
import CustomButton from "../Utilities/CustomButton";
import Spinner from "../Utilities/Spinner";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default class FirstLaunch1 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			apiID: "",
		};
	}
	async componentDidMount() {
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
						<Spinner size={48} color={Palette.shades.grey[0]} />
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
