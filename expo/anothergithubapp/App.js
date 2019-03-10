import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createAppContainer, createStackNavigator } from 'react-navigation'
import { Provider } from 'react-redux'
import store from './reducers/store'
import { Login, Home, Loading } from './components'

// createStackNavigator takes route config obj & options obj=> returns a React component
const AppNavigator = createStackNavigator(
  { Home, Login, Loading },
  {
    initialRouteName: 'Loading',
    headerLeft: null,
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