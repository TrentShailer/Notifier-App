import axios from "axios";
import React, { createRef, useEffect, useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	TouchableOpacity,
	Linking,
} from "react-native";
import { useSelector } from "react-redux";
import Palette from "../Utilities/Palette";
import { Svg, Path } from "react-native-svg";

import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import * as Localization from "expo-localization";
import "intl";

import "@formatjs/intl-datetimeformat/polyfill";
import "@formatjs/intl-getcanonicallocales/polyfill";
import "@formatjs/intl-numberformat/polyfill";
import "@formatjs/intl-locale/polyfill";
import "@formatjs/intl-pluralrules/polyfill";

import "@formatjs/intl-pluralrules/locale-data/en";
import "@formatjs/intl-datetimeformat/locale-data/en"; // locale-data for en
import "@formatjs/intl-datetimeformat/add-all-tz";
import "@formatjs/intl-numberformat/locale-data/en";
import "intl/locale-data/jsonp/en";

export default function Sender(props) {
	const senderApiID = props.route.params.senderApiID;
	var apiID = useSelector((state) => state.apiID);
	var senders = useSelector((state) => state.senders);
	const [messages, setMessages] = useState([]);
	const [scrollRef, setScrollRef] = useState();
	useEffect(() => {
		axios
			.post("http://192.168.9.101:3005/sender/get/messages/sender", {
				apiID: apiID,
				senderApiID: senderApiID,
			})
			.then((res) => {
				if (res.data.error) return alert(res.data.error);
				setMessages(res.data.messages);
			})
			.catch((error) => {
				alert("Failed to get messages");
			});
	}, []);
	return (
		<View style={styles.mainView}>
			<ScrollView
				ref={(scroll) => {
					setScrollRef(scroll);
				}}
				decelerationRate={"fast"}
				onContentSizeChange={(contentWidth, contentHeight) => {
					scrollRef.scrollToEnd();
				}}>
				{messages.map((message) => {
					return <Message key={message.id} message={message} />;
				})}
				{messages.length === 0 ? (
					<TouchableOpacity
						style={{
							flex: 1,
							flexDirection: "row",
							alignItems: "center",
							elevation: 3,
							height: 50,
							marginBottom: 15,
						}}
						onPress={() => {
							Linking.openURL(
								"https://github.com/TrentShailer/Notifier-Webserver/blob/master/Help.md"
							);
						}}>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "center",
							}}>
							<Svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								style={{ marginRight: 5 }}>
								<Path
									fill={Palette.shades.green[5]}
									d="M15.07,11.25L14.17,12.17C13.45,12.89 13,13.5 13,15H11V14.5C11,13.39 11.45,12.39 12.17,11.67L13.41,10.41C13.78,10.05 14,9.55 14,9C14,7.89 13.1,7 12,7A2,2 0 0,0 10,9H8A4,4 0 0,1 12,5A4,4 0 0,1 16,9C16,9.88 15.64,10.67 15.07,11.25M13,19H11V17H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z"
								/>
							</Svg>
							<Text
								style={{
									color: Palette.shades.green[5],
									fontWeight: "600",
									fontSize: 20,
								}}>
								How to send a message
							</Text>
						</View>
					</TouchableOpacity>
				) : null}
			</ScrollView>
		</View>
	);
}

function Message(props) {
	var tz = "";
	var [formattedDate, setFormattedDate] = useState("");
	useEffect(() => {
		tz = Localization.timezone;
		var localTime = utcToZonedTime(props.message.sentTime, tz);
		setFormattedDate(format(localTime, "d/MM/yy hh:mm aa"));
	});

	return (
		<View
			style={{
				marginLeft: 20,
				marginRight: 20,
				marginTop: 20,
				marginBottom: 20,
			}}>
			<Text style={{ color: Palette.shades.grey[7], fontSize: 12 }}>
				{formattedDate}
			</Text>
			<Text style={{ color: Palette.shades.grey[0], fontSize: 16 }}>
				{props.message.message}
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	mainView: {
		backgroundColor: Palette.shades.grey[9],
		width: "100%",
		height: "100%",
		flex: 1,
	},
});
