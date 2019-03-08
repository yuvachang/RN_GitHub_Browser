/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */
// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import { createAppContainer, createStackNavigator } from 'react-navigation'
import { Provider } from 'react-redux'
import store from './reducers/store'
import firebase from 'react-native-firebase'
import {Login, Home, Loading} from './components'

// createStackNavigator takes route config obj & options obj=> returns a React component
const AppNavigator = createStackNavigator(
  { Home, Login, Loading},
  {
    initialRouteName: 'Loading',
    headerLeft: null
  }
)

const AppContainer = createAppContainer(AppNavigator)

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}

// class DetailsScreen extends Component {
//   render() {
//     return (
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <Text>Details Screen</Text>
//         <Button
//           title='Go to Details... again'
//           onPress={() => this.props.navigation.push('details')}
//         />
//         <Button
//           title='Go to Home'
//           onPress={() => this.props.navigation.navigate('home')}
//         />
//         <Button
//           title='Go back'
//           onPress={() => this.props.navigation.goBack()}
//         />
//       </View>
//     )
//   }
// }
