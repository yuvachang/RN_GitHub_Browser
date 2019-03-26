import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import { fetchRepoContentThunk } from '../reducers/data'
import { Container, Body } from 'native-base'
import HeaderC from './Header'

class Home extends Component {
  componentDidMount() {
    await this.props.fetchReposThunk('public', 'created', 'owner')
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
          <HeaderC navigation={this.props.navigation}/>
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
  fetchRepoContentThunk: () => dispatch(fetchRepoContentThunk()),
})

export default connect(
  mapState,
  mapDispatch
)(Home)
