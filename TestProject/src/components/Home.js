import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Button } from 'react-native'
import { createAppContainer, createStackNavigator } from 'react-navigation'
import firebase from 'react-native-firebase'

class Home extends Component {
  handleLogin(){

  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Welcome.</Text>
        firebase.auth().onAuthStateChanged
        <Button
          title='Login with GitHub'
          onPress={this.handleLogin}
        />
      </View>
    )
  }
}

export default Home