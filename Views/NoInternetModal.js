import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";

export default class NoInternetModal extends Component {
	render() {
		return (
			<View style={styles.main}>
				<Text>Waiting for network connection</Text>
				<Text>
					Ensure wifi and data are turned on and enabled for this app.
				</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	main: {
		flex: 1,
		alignContent: "center",
		alignItems: "center",
		justifyContent: "center",
		height: "100%",
		width: "100%",
	},
});
