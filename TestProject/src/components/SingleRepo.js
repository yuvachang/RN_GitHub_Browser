import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import { connect } from 'react-redux'
import { fetchReposThunk } from '../reducers/data'
import { Icon, Header, Container, Left, Body, Right, Title } from 'native-base'

class Home extends Component {
  componentDidMount() {
    // await this.props.fetchReposThunk('public', 'created', 'owner')
  }

  render() {
    if (!this.props.repos[0]) {
      return (
        <View>
          <Text>Loading repos...</Text>
        </View>
      )
    } else {
      return (
        <Container>
          <Header style={{ backgroundColor: 'grey' }}>
            <Left>
              <Icon
                name='menu'
                onPress={() => this.props.navigation.toggleDrawer()}
              />
            </Left>
            <Right>
              <View />
            </Right>
          </Header>
          <Body
            style={{
              flex: 1,
              alignItems: 'flex-start',
              justifyContent: 'center',
            }}>
            <Text>Single repo page:</Text>
            <Text>Repo name: {this.props.name}</Text>
            <Text>Go to Repo Content</Text>
          </Body>
        </Container>
      )
    }
  }
}

const mapState = state => ({
  repos: state.dataReducer.repos,
})

const mapDispatch = dispatch => ({
  fetchReposThunk: (visFilter, sortFilter, affiliation) => dispatch(fetchReposThunk(visFilter, sortFilter, affiliation)),
})

export default connect(
  mapState,
  mapDispatch
)(Home)
