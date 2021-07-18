import React, { useState } from "react";
import {
	Text,
	StyleSheet,
	View,
	TouchableOpacity,
	TextInput,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import Palette from "../Utilities/Palette";
import Spinner from "../Utilities/Spinner";
import CustomButton from "../Utilities/CustomButton";
import { navigationRef } from "../Utilities/Store";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { assignSenders } from "../Utilities/Slices";

export default function FirstLunch2(props) {
	const [pageLoading, setPageLoading] = useState(false);
	const [showNameBox, setShowNameBox] = useState(false);
	const [currentSenderName, setCurrentSenderName] = useState("");
	var dispatch = useDispatch();
	var apiID = useSelector((state) => state.apiID);
	var senders = useSelector((state) => state.senders);
	return (
		<View style={styles.mainView}>
			{pageLoading ? (
				<View
					style={{
						backgroundColor: "rgba(30,30,30, 0.5)",
						width: "100%",
						height: "100%",
						position: "absolute",
						elevation: 5,
						flex: 1,
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center",
					}}>
					<Spinner size={128} color={Palette.shades.green[5]} />
				</View>
			) : null}
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
						setShowNameBox(true);
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
							{senders.length}/10
						</Text>
					</View>
				</TouchableOpacity>
				<View style={{ width: "100%", marginTop: 20 }}>
					{senders.map((sender) => {
						return (
							<Sender
								key={sender.apiID}
								apiID={apiID}
								data={sender}
							/>
						);
					})}
				</View>
				<View
					style={{
						width: "95%",
						height: 1,
						backgroundColor: Palette.shades.grey[5],
						marginLeft: "2%",
						marginRight: "2%",
					}}
				/>
				{showNameBox ? (
					<View style={{ width: "100%", height: 50 }}>
						<TextInput
							placeholder="Enter Sender Name"
							value={currentSenderName}
							onChangeText={(val) => {
								setCurrentSenderName(val);
							}}
							onSubmitEditing={() => {
								if (
									currentSenderName === "" ||
									currentSenderName.match(/^ +$/)
								) {
									return;
								}
								setShowNameBox(false);
								setPageLoading(true);
								axios
									.post(
										"http://notification.trentshailer.com/sender/create",
										{
											name: currentSenderName,
											apiID: apiID,
										}
									)
									.then((res) => {
										if (res.data.error) {
											alert(res.data.error);
										} else {
											dispatch(
												assignSenders(res.data.senders)
											);
										}
										setCurrentSenderName("");
										setPageLoading(false);
									})
									.catch((err) => {
										alert("Failed to create sender.");
									});
							}}
							autoCompleteType="off"
							autoFocus={true}
							maxLength={20}
							placeholderTextColor={Palette.shades.grey[5]}
							style={{
								padding: 10,
								height: 50,
								marginLeft: 20,
								marginRight: 20,
								color: Palette.shades.grey[0],
							}}
						/>
					</View>
				) : null}
			</View>
			{showNameBox ? null : (
				<View style={{ width: "100%" }}>
					<CustomButton
						onPress={() => props.navigation.navigate("Main")}
						color={Palette.shades.green[5]}
						text={"Finish"}
					/>
				</View>
			)}
		</View>
	);
}

function Sender(props) {
	return (
		<View style={{ height: 50, width: "100%" }}>
			<View
				style={{
					width: "95%",
					height: 1,
					backgroundColor: Palette.shades.grey[5],
					marginLeft: "2%",
					marginRight: "2%",
				}}
			/>
			<TouchableOpacity
				style={{ elevation: 3, width: "100%", height: 50 }}
				onPress={() => {
					navigationRef.current?.navigate("EditSender", {
						sender: props.data,
						apiID: props.apiID,
					});
				}}>
				<View
					style={{
						flex: 1,
						flexDirection: "row",
						width: "100%",
						marginLeft: 20,
						marginRight: 20,
						marginTop: 10,
						marginBottom: 10,
					}}>
					<View style={{ alignSelf: "flex-start" }}>
						<Text
							style={{
								fontSize: 20,
								color: Palette.shades.grey[0],
							}}>
							{props.data.name}
						</Text>
					</View>
					<View
						style={{
							marginTop: 3,
							marginLeft: "auto",
							marginRight: 35,
						}}>
						<Svg
							style={{}}
							width="24"
							height="24"
							viewBox="0 0 24 24">
							<Path
								fill={Palette.shades.grey[5]}
								d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"
							/>
						</Svg>
					</View>
				</View>
			</TouchableOpacity>
		</View>
	);
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
