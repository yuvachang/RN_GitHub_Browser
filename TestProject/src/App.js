import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import {
  createStackNavigator,
  createSwitchNavigator,
  createDrawerNavigator,
  createAppContainer,
} from 'react-navigation'

import { Provider } from 'react-redux'
import store from './reducers/store'
import { Login, Home, DrawerComp, Logout, Loading, Repos } from './components'
import {Icon} from 'native-base'

const AppDrawerStack = createDrawerNavigator(
  {
    Home: Home,
    Repos,
    Logout: Logout,
  },
  {
    initialRouteName: 'Home',
    drawerWidth: 111,
    contentComponent: DrawerComp,
    contentOptions: {
      activeTintColor: '#e91e63',
      itemsContainerStyle: {
        marginVertical: 0,
      },
      iconContainerStyle: {
        opacity: 1,
      },
    },
  }
)

const AuthStack = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: ({ navigation }) => ({
        header: null,
      }),
    },
    //signup
    //reset etc
  }
)

const SwitchNavigator = createSwitchNavigator(
  {
    Loading,
    Login: AuthStack,
    App: AppDrawerStack
  },
  {
    initialRouteName: 'Loading',
  }
)

const AppContainer = createAppContainer(SwitchNavigator)

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}
