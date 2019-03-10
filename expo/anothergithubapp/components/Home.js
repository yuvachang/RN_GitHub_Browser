import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Button } from 'react-native'
import { createAppContainer, createStackNavigator } from 'react-navigation'
import {connect} from 'react-redux'

class Home extends Component {
  handleLogin(){

  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Welcome {this.props.user.login}.</Text>
        <Button
          title='Login with GitHub'
          onPress={this.handleLogin}
        />
      </View>
    )
  }
}

const mapState = (state) => ({
  user: state.userReducer.user
})

const mapDispatch = dispatch => ({
  
})

export default connect(mapState, mapDispatch)(Home)