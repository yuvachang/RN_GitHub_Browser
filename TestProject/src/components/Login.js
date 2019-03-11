import React, { Component } from 'react'
import {
  Text,
  TextInput,
  View,
  Button,
  ActivityIndicator,
} from 'react-native'
import { connect } from 'react-redux'

import { loginUserThunk, loading } from '../reducers/user'
import styles from '../styles'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      emptyMsg: null,
    }
  }

  handleLogin = async () => {
    if (this.state.email === '' && this.state.password === '') {
      await this.setState({ emptyMsg: 'both' })
      return
    } else if (this.state.email === '') {
      await this.setState({ emptyMsg: 'email' })
      return
    } else if (this.state.password === '') {
      await this.setState({ emptyMsg: 'password' })
      return
    }
    await this.setState({ emptyMsg: null })
    this.props.loading()
    await this.props.loginUserThunk(this.state)
    if (this.props.user.id) {
      this.setState({ emptyMsg: 'loading' })
      setTimeout(() => {
        this.props.navigation.navigate('App')
      }, 700);
    } 
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Basic Auth: enter username and password</Text>
        {this.props.errorMessage !== '' && (
          <Text style={{ color: 'red' }}>
            {this.props.errorMessage}: username or password incorrect
          </Text>
        )}
        {this.state.emptyMsg === 'both' && <Text>Enter credentials.</Text>}
        {this.state.emptyMsg === 'email' && (
          <Text>Enter an email or username.</Text>
        )}
        {this.state.emptyMsg === 'password' && <Text>Enter a password.</Text>}
        <TextInput
          style={styles.textInput}
          autoCapitalize='none'
          placeholder='Email or username'
          onChangeText={text => this.setState({ email: text })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize='none'
          placeholder='Password'
          onChangeText={text => this.setState({ password: text })}
          value={this.state.password}
        />
        <Button title='Login to Github' onPress={this.handleLogin} />
        {(this.props.loading === true || this.state.emptyMsg==='loading') && <ActivityIndicator size='small' />}
      </View>
    )
  }
}

const mapState = state => ({
  user: state.userReducer.user,
  errorMessage: state.userReducer.errorMessage,
  loading: state.userReducer.loading,
})

const mapDispatch = dispatch => ({
  loginUserThunk: login => dispatch(loginUserThunk(login)),
  loading: () => dispatch(loading()),
})

export default connect(
  mapState,
  mapDispatch
)(Login)
