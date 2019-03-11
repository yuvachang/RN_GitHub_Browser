import React from 'react'
import { AsyncStorage, View, Text, ActivityIndicator } from 'react-native'
import styles from '../styles'
import {loginUser} from '../reducers/user'
import { connect } from 'react-redux'

class Loading extends React.Component {
  async componentDidMount() {
    let userObj = await AsyncStorage.getItem('userObj')
    if (userObj !== null) {
      console.log('userObj exists!!!' , userObj)
      let user = JSON.parse(userObj)
      this.props.loginUser(user)
      setTimeout(() => {
        this.props.navigation.navigate('App')
      }, 700);
    } else {
      setTimeout(() => {
        this.props.navigation.navigate('Login')
      }, 500);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
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
  loginUser: user => dispatch(loginUser(user)),
})

export default connect(
  null,
  mapDispatch
)(Loading)