import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";
import Palette from "../Utilities/Palette";
import Spinner from "../Utilities/Spinner";
import CustomButton from "../Utilities/CustomButton";
export default class FirstLaunch2 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			apiID: "",
			loaded: false,
			senders: [],
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
		// load senders
		var senders = await AsyncStorage.getItem("senders");
		if (senders !== null) {
			this.setState({ senders: JSON.parse(senders), loaded: true });
		} else {
			this.setState({ loaded: true });
		}
	}

	render() {
		return (
			<View style={styles.mainView}>
				<View style={styles.mainView}>
					<Text
						style={{
							marginTop: 20,
							color: Palette.shades.grey[0],
							fontSize: 40,
						}}>
						Configure Senders
					</Text>
					<View style={{ marginLeft: 10, marginRight: 10 }}>
						<Text
							style={{
								color: Palette.shades.grey[0],
								textAlign: "center",
							}}>
							Senders are used to separate messages from different
							sources.
						</Text>
						<Text
							style={{
								color: Palette.shades.grey[0],
								textAlign: "center",
							}}>
							You may view up to the last 50 messages from each
							sender.
						</Text>
					</View>
					<TouchableOpacity
						style={{
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "center",
							elevation: 3,
							height: 50,
							marginTop: 25,
						}}
						onPress={() => {
							if (this.state.loaded) {
							}
						}}>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "center",
								marginLeft: 25,
								marginRight: 25,
							}}>
							<Svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								style={{ marginRight: 20 }}>
								<Path
									fill={Palette.shades.green[5]}
									d="M17,13H13V17H11V13H7V11H11V7H13V11H17M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
								/>
							</Svg>
							<Text
								style={{
									color: Palette.shades.green[5],
									fontWeight: "600",
									fontSize: 20,
								}}>
								Add Sender
							</Text>
							<Text
								style={{
									color: Palette.shades.green[5],
									fontSize: 20,
									fontWeight: "600",
									marginLeft: "50%",
								}}>
								{this.state.loaded ? (
									`${this.state.senders.length}/10`
								) : (
									<Spinner
										size={30}
										color={Palette.shades.green[5]}
									/>
								)}
							</Text>
						</View>
					</TouchableOpacity>
				</View>
				<View style={{ width: "100%" }}>
					<CustomButton
						onPress={() => this.props.navigation.navigate("Home")}
						color={Palette.shades.green[5]}
						text={"Finish"}
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
