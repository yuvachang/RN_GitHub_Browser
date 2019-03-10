
import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import {
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer,
} from 'react-navigation'

import { Provider } from 'react-redux'
import store from './reducers/store'
import { Login, Home, DrawerComp, Logout, Loading } from './components'

const StackNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({ navigation }) => ({
        // headerStyle: { backgroundColor: 'grey' },
        // headerTitleStyle: {textAlign: 'center', flex: 1},
        // title: 'Home!',
        // headerLeft: (
        //   <Text onPress={() => navigation.toggleDrawer()}>Menu</Text>
        // ),
        // headerRight: (<View />)
      }),
    },
    Login,
    Loading,
  },
  {
    initialRouteName: 'Home',
    // headerLeft: null,
  }
)

const AppDrawerNavigator = createDrawerNavigator(
  {
    Home: StackNavigator,
    Logout: Logout
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

const AppContainer = createAppContainer(AppDrawerNavigator)

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}
