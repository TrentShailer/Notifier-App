import React, { useState } from "react";
import {
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
	TextInput,
	Alert,
} from "react-native";
import Palette from "../Utilities/Palette";
import axios from "axios";
import Svg, { Path } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import { assignSenders } from "../Utilities/Slices";

export default function EditSender(props) {
	const [sender, setSender] = useState(props.route.params.sender);
	const [editingName, setEditingName] = useState(false);
	const [senderName, setSenderName] = useState(sender.name);
	var dispatch = useDispatch();
	var apiID = useSelector((state) => state.apiID);
	var senders = useSelector((state) => state.senders);

	return (
		<View style={styles.mainView}>
			<View
				style={{
					width: "100%",
					height: "100%",
					flex: 1,
					marginLeft: 50,
				}}>
				<View style={{ marginTop: 20 }}>
					<TouchableOpacity
						onPress={() => {
							setEditingName(true);
						}}>
						<Text
							style={{
								color: Palette.shades.grey[0],
								fontSize: 30,
							}}>
							Sender Name
						</Text>
						{editingName ? (
							<TextInput
								placeholder="Enter Sender Name"
								value={senderName}
								onChangeText={(val) => {
									setSenderName(val);
								}}
								onSubmitEditing={() => {
									if (
										senderName === "" ||
										senderName.match(/^ +$/)
									) {
										return;
									}
									setEditingName(false);
									axios
										.post(
											"http://192.168.9.101:3005/sender/edit/rename",
											{
												name: senderName,
												senderApiID: sender.apiID,
												apiID: apiID,
											}
										)
										.then(async (res) => {
											if (res.data.error) {
												alert(res.data.error);
											} else {
												dispatch(
													assignSenders(
														res.data.senders
													)
												);
												var newSender = { ...sender };
												newSender.name = senderName;
												setSender(newSender);
											}
										})
										.catch((err) => {
											console.log(err);
											alert("Failed to edit sender.");
										});
								}}
								autoCompleteType="off"
								autoFocus={true}
								maxLength={20}
								placeholderTextColor={Palette.shades.grey[5]}
								style={{
									fontSize: 20,
									padding: 10,
									height: 50,
									color: Palette.shades.grey[0],
								}}
							/>
						) : (
							<Text
								style={{
									color: Palette.shades.green[5],
									fontSize: 20,
								}}>
								{sender.name}
							</Text>
						)}
					</TouchableOpacity>
				</View>
				<View style={{ marginTop: 20 }}>
					<Text
						style={{
							color: Palette.shades.grey[0],
							fontSize: 30,
						}}>
						Sender ID
					</Text>
					<Text
						style={{
							color: Palette.shades.grey[5],
							fontSize: 20,
						}}>
						{sender.apiID}
					</Text>
				</View>
				<View
					style={{
						width: "92%",
						height: 1,
						backgroundColor: Palette.shades.grey[5],
						marginTop: 25,
						marginBottom: 25,
						marginLeft: "-2%",
						marginRight: "2%",
					}}
				/>
				<Text
					style={{
						color: Palette.shades.grey[5],
						marginBottom: 25,
					}}>
					Notifications
				</Text>
				<View>
					<TouchableOpacity
						onPress={() => {
							axios
								.post(
									"http://192.168.9.101:3005/sender/edit/mute",
									{
										senderApiID: sender.apiID,
										apiID: apiID,
										mute: !sender.muted,
									}
								)
								.then((res) => {
									if (res.data.error)
										return alert(res.data.error);
									dispatch(assignSenders(res.data.senders));
									var newSender = { ...sender };
									newSender.muted = !sender.muted;
									setSender(newSender);
								})
								.catch((error) => {
									alert("Failed to edit sender.");
								});
						}}>
						<Text
							style={{
								color: Palette.shades.grey[0],
								fontSize: 20,
							}}>
							Mute message notifications
						</Text>
						<Text
							style={{
								color: Palette.shades.green[5],
								fontSize: 15,
							}}>
							{sender.muted ? "Yes" : "No"}
						</Text>
					</TouchableOpacity>
				</View>
			</View>
			<TouchableOpacity
				style={{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "center",
					elevation: 3,
					height: 75,
					marginTop: 25,
				}}
				onPress={() => {
					Alert.alert("Confirm Deletion", "This cannot be undone", [
						{
							text: "Cancel",
							style: "cancel",
						},
						{
							text: "Delete",
							onPress: () => {
								axios
									.post(
										"http://192.168.9.101:3005/sender/delete",
										{
											senderApiID: sender.apiID,
											apiID: apiID,
										}
									)
									.then(async (res) => {
										if (res.data.error)
											return alert(res.data.error);
										dispatch(
											assignSenders(res.data.senders)
										);
										props.navigation.goBack();
									})
									.catch((err) => {
										alert("Failed to delete sender");
									});
							},
							style: "destructive",
						},
					]);
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
							fill={Palette.shades.red[5]}
							d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
						/>
					</Svg>
					<Text
						style={{
							color: Palette.shades.red[5],
							fontWeight: "600",
							fontSize: 20,
						}}>
						Delete Sender
					</Text>
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
