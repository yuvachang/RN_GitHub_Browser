import React from 'react'
import { View, Text, ActivityIndicator, AsyncStorage } from 'react-native'
import styles from '../styles'
import { StackActions, NavigationActions } from 'react-navigation'

class Loading extends React.Component {
  async componentDidMount(){
  let loggedIn = await AsyncStorage.getItem('user') 
  console.log(loggedIn)
  this.props.navigation.navigate(loggedIn!==null ? 'Home':'Login')
}

  render() {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    )
  }
}

export default Loading