import React from "react";
import { Text, StyleSheet, View } from "react-native";
import Palette from "../Utilities/Palette";

export default function Home() {
	return (
		<View style={styles.mainView}>
			<Text> textInComponent </Text>
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
