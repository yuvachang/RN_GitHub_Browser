import React, { Component } from 'react'
import { StackActions, NavigationActions } from 'react-navigation'
import { Text, TextInput, View, Button } from 'react-native'
import { connect } from 'react-redux'
import { loginUserThunk } from '../reducers/user'
import styles from '../styles'

class Login extends Component {
  static navigationOptions = {
    headerLeft: null,
  }

  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
    }
    this.handleChange=this.handleChange.bind(this)
    this.handleLogin=this.handleLogin.bind(this)
  }

  handleChange(txt, key) {
    console.log(this.state, txt, key)
    this.setState({
      [key]: txt,
    })
  }

  handleLogin() {
    // TODO: Firebase stuff...
    console.log(this.state)
    this.props.loginUserThunk(this.state)
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
          placeholder='Email or username'
          onChangeText={txt => this.setState({email: txt})}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize='none'
          placeholder='Password'
          onChangeText={txt => this.handleChange(txt, 'password')}
          value={this.state.password}
        />
        {/* <Button
          title="Don't have an account? Sign Up"
          onPress={() => this.props.navigation.navigate('SignUp')}
        /> */}

        <Button title='Login to Github' onPress={this.handleLogin} />
      </View>
    )
  }
}

const mapState = state => ({
  user: state.userReducer.user,
})

const mapDispatch = dispatch => ({
  loginUserThunk: () => dispatch(loginUserThunk()),
})

export default connect(
  mapState,
  mapDispatch
)(Login)
