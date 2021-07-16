import React from "react";
import { Text, TouchableOpacity } from "react-native";
import Palette from "./Palette";

export default function CustomButton(props) {
	return (
		<TouchableOpacity
			style={{
				flexDirection: "row",
				backgroundColor: props.color,
				alignItems: "center",
				justifyContent: "center",
				elevation: 3,
				height: 50,
				...props.style,
			}}
			onPress={props.onPress}>
			<Text
				style={{
					color: Palette.shades.grey[0],
					fontWeight: "600",
					fontSize: 18,
				}}>
				{props.text}
			</Text>
		</TouchableOpacity>
	);
}
