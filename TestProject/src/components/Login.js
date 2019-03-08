import React, { Component } from 'react'
import { StackActions, NavigationActions } from 'react-navigation'
import { Text, TextInput, View, Button } from 'react-native'
import { connect } from 'react-redux'
import firebase from 'react-native-firebase'

import { loginUserThunk } from '../reducers/user'
import styles from '../styles'

class Login extends Component {
  static navigationOptions = {
    headerLeft: null,
  }

  state = {
    email: '',
    password: '',
    // errorMessage: null,
  }

  handleLogin = () => {
    // TODO: Firebase stuff...
    console.log('handleLogin', this.state)
  }

  handleOauth() {
    this.props.loginUser()
  }

  componentDidMount() {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Login' })],
      key: 'Login',
    })
    this.props.navigation.dispatch(resetAction)
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Basic Auth. Enter credentials.</Text>
        {this.state.errorMessage && (
          <Text style={{ color: 'red' }}>{this.state.errorMessage}</Text>
        )}
        <TextInput
          style={styles.textInput}
          autoCapitalize='none'
          placeholder='Email'
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize='none'
          placeholder='Password'
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        {/* <Button
          title="Don't have an account? Sign Up"
          onPress={() => this.props.navigation.navigate('SignUp')}
        /> */}

        <Button title='Login to Github' onPress={this.handleLogin} />
        <Button title='Login with Github' onPress={this.handleOauth} />
      </View>
    )
  }
}

const mapState = state => ({
  user: state.user.user,
})

const mapDispatch = dispatch => ({
  loginUserThunk: () => dispatch(loginUserThunk()),
})

export default connect(mapState, mapDispatch)(Login)

// firebase.auth().onAuthStateChanged
