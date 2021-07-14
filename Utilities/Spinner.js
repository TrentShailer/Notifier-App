import React, { Component } from "react";

import { Animated, Easing } from "react-native";

import Svg, { Path } from "react-native-svg";

export default class Spinner extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rotateZ: new Animated.Value(0),
		};
	}
	spinner = () => {
		Animated.loop(
			Animated.timing(this.state.rotateZ, {
				toValue: 1,
				duration: 750,
				easing: Easing.linear,
				useNativeDriver: true,
			})
		).start();
	};

	async componentDidMount() {
		this.spinner();
	}
	render() {
		return (
			<Animated.View
				style={{
					transform: [
						{
							rotateZ: this.state.rotateZ.interpolate({
								inputRange: [0, 1],
								outputRange: ["0deg", "360deg"],
							}),
						},
					],
				}}>
				<Svg
					width={this.props.size}
					height={this.props.size}
					viewBox="0 0 24 24">
					<Path
						fill={this.props.color}
						d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"
					/>
				</Svg>
			</Animated.View>
		);
	}
}
