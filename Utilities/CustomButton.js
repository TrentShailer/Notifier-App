import React, { Component } from "react";
import { Text, TouchableOpacity } from "react-native";
import Palette from "./Palette";

export default class CustomButton extends Component {
	render() {
		return (
			<TouchableOpacity
				style={{
					flexDirection: "row",
					backgroundColor: this.props.color,
					alignItems: "center",
					justifyContent: "center",
					elevation: 3,
					height: 50,
					...this.props.style,
				}}
				onPress={this.props.onPress}>
				<Text
					style={{
						color: Palette.shades.grey[0],
						fontWeight: "600",
						fontSize: 18,
					}}>
					{this.props.text}
				</Text>
			</TouchableOpacity>
		);
	}
}
