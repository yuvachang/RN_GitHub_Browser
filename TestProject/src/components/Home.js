import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import { connect } from 'react-redux'
import { Icon, Header, Container, Left, Body, Right } from 'native-base'

class Home extends Component {
  componentDidMount() {
    if (!this.props.user.id) {
      this.props.navigation.navigate('Loading')
    }
  }

  render() {
    return (
      <Container>
        <Header style={{backgroundColor: 'grey'}}>
          <Left>
            <Icon name='menu' onPress={() => this.props.navigation.toggleDrawer()} />
          </Left>
          <Right>
            <View/>
          </Right>
        </Header>

        <Body
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Welcome {this.props.user.login}.</Text>
          <Text>HOME PAGE</Text>
          <Text>Recent activity:</Text> 
          <View>

          </View>
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
