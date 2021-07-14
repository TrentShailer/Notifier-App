import React, { Component } from "react";
import { Text, View } from "react-native";

export default class EditSender extends Component {
	render() {
		const data = this.props.route.params;
		return (
			<View>
				<Text>{data.sender.apiID}</Text>
			</View>
		);
	}
}
