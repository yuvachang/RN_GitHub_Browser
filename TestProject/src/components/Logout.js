import React from 'react'
import { AsyncStorage, View, Text, ActivityIndicator } from 'react-native'
import styles from '../styles'
import { connect } from 'react-redux'
import {logout} from '../reducers/user'

class Loading extends React.Component {
  async componentDidMount() {
    let userObj = await AsyncStorage.getItem('userObj')
    if (userObj !== null) {
      await AsyncStorage.removeItem('userObj')
      await this.props.logout()
      this.props.navigation.navigate('Home')
    } else (
      this.props.navigation.navigate('Login')
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Logging out...</Text>
        <ActivityIndicator size='large' />
      </View>
    )
  }
}

// const mapState = state => ({
//   user: state.userReducer.user,
//   errorMessage: state.userReducer.errorMessage,
//   loading: state.userReducer.loading
// })

const mapDispatch = dispatch => ({
  logout: () => dispatch(logout()),
})

export default connect(
  null,
  mapDispatch
)(Loading)