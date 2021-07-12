import React, { Component } from 'react'
import { Button, StyleSheet, View } from 'react-native'
import { navigation } from '@react-navigation/native';

export default class FirstLaunch1 extends Component {
	render() {
		return (
			<View>
				 <Button
	  title="Go to page 2"
	  onPress={() =>
		this.props.navigation.navigate('FirstLaunch2')
	  }
	/>
			</View>
		)
	}
}

const styles = StyleSheet.create({

})
