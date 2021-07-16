import React from "react";
import { View, StyleSheet } from "react-native";
import Palette from "../Utilities/Palette";
import Spinner from "../Utilities/Spinner";

export default function Loading() {
	return (
		<View style={{ ...styles.mainView }}>
			<View style={{ marginTop: 250 }}>
				<Spinner size={128} color={Palette.shades.green[5]} />
			</View>
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
