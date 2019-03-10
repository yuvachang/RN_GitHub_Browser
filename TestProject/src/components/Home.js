import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import Loading from './Loading'

class Home extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: { backgroundColor: 'grey' },
      headerTitleStyle: { textAlign: 'center', flex: 1 },
      title: 'Home!',
      headerLeft: <Text onPress={() => navigation.toggleDrawer()}>Menu</Text>,
      headerRight: <View />,
    }
  }
  handleLogin() {}

  componentDidUpdate(prevProps){
    if((prevProps.user.id && !this.props.user.id)|| !this.props.user.id){
      this.props.navigation.push('Loading')
    }
  }

  componentDidMount() {
    if (!this.props.user.id) {
      this.props.navigation.push('Loading')
    }
  }

  render() {
    // if (!this.props.user.id) {
    //   return <Loading />
    // } else
    if (this.props.user.id) {
      return (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Welcome {this.props.user.login}.</Text>
          <Text>HOME PAGE</Text>
        </View>
      )
    } else return null
  }
}

const mapState = state => ({
  user: state.userReducer.user,
})

const mapDispatch = dispatch => ({})

export default connect(
  mapState,
  mapDispatch
)(Home)
