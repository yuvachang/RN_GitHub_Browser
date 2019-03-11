import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import { Container, Body } from 'native-base'
import HeaderC from './Header'
import styles from '../styles'

class Home extends Component {
  componentDidMount() {
    if (!this.props.user.id) {
      this.props.navigation.navigate('Loading')
    }
  }

  render() {
    return (
      <Container>
        <HeaderC navigation={this.props.navigation} />
        <Text style={styles.title}>Welcome {this.props.user.login}.</Text>
        <Body style={styles.body}>
          <Text> </Text>
          <Text>Recent activity:</Text>
          <View />
        </Body>
      </Container>
    )
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
