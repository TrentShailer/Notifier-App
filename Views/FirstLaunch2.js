import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import Palette from "../Utilities/Palette";

export default class FirstLaunch2 extends Component {
	render() {
		return (
			<View style={styles.mainView}>
				<Text> Test2 </Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	mainView: {
		backgroundColor: Palette.shades.grey[9],
		width: "100%",
		height: "100%",
	},
});
