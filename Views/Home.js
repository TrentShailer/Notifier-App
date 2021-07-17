import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import Palette from "../Utilities/Palette";
import { Circle, Svg } from "react-native-svg";
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import * as Localization from "expo-localization";
import { navigationRef } from "../Utilities/Store";

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
import axios from "axios";

export default function Home(props) {
	const dispatch = useDispatch();
	const apiID = useSelector((state) => state.apiID);
	const storedSenders = useSelector((state) => state.senders);
	const [senders, setSenders] = useState([]);
	useEffect(() => {
		axios
			.post("http://192.168.9.101:3005/sender/get/homepage", {
				apiID: apiID,
			})
			.then((res) => {
				if (res.data.error) return alert(res.data.error);
				setSenders(res.data.senders);
			})
			.catch((error) => {
				alert("Failed to get senders");
			});
	}, [storedSenders]);
	return (
		<View style={styles.mainView}>
			<View style={{ marginLeft: 20, marginTop: 30 }}>
				{senders.map((sender) => {
					return (
						<Sender
							key={sender.apiID}
							latestMessage={sender.message}
							apiID={apiID}
							data={sender}
						/>
					);
				})}
			</View>
		</View>
	);
}

function Sender(props) {
	var tz = "";
	const [formattedDate, setFormattedDate] = useState("");
	useEffect(() => {
		tz = Localization.timezone;
		if (props.latestMessage) {
			var localTime = utcToZonedTime(props.latestMessage.date, tz);
			var timeDiff = Date.now() - localTime.getTime();
			if (timeDiff < 86400000)
				setFormattedDate(format(localTime, "hh:mm aa"));
			else setFormattedDate(format(localTime, "d/MM/yy"));
		}
	});
	return (
		<TouchableOpacity
			onPress={() => {
				navigationRef.current?.navigate("sender", {
					senderApiID: props.data.apiID,
					name: props.data.name,
				});
			}}
			style={{ width: "100%", height: 50, marginBottom: 30 }}>
			<Text style={{ color: Palette.shades.grey[0], fontSize: 25 }}>
				{props.data.name}
			</Text>
			{props.latestMessage && !props.latestMessage.seen ? (
				<Svg
					width={100}
					height={100}
					style={{ position: "absolute", left: 0 }}>
					<Circle
						r="5"
						cx={props.data.name.length * 14}
						cy={10}
						fill={Palette.shades.red[5]}
					/>
				</Svg>
			) : null}

			{props.latestMessage ? (
				<Text
					numberOfLines={1}
					ellipsizeMode="tail"
					style={{
						color: Palette.shades.grey[5],
						width: "75%",
					}}>
					{props.latestMessage.message}
				</Text>
			) : null}
			{props.latestMessage ? (
				<View style={{ position: "absolute", right: 10, top: 20 }}>
					<Text
						style={{
							color: Palette.shades.grey[5],
							textAlign: "right",
						}}>
						{formattedDate}
					</Text>
				</View>
			) : null}
		</TouchableOpacity>
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
