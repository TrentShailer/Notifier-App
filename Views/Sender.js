import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

export default function Sender(props) {
	const senderApiID = props.route.params.senderApiID;
	var apiID = useSelector((state) => state.apiID);
	var senders = useSelector((state) => state.senders);
	return (
		<View>
			<Text></Text>
		</View>
	);
}

const styles = StyleSheet.create({});
