import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import { connect } from 'react-redux'
import { fetchRepoContentThunk } from '../reducers/data'
import { Icon, Header, Container, Left, Body, Right, Title } from 'native-base'

class SingleRepo extends Component {
  async componentDidMount() {
    const repoName = this.props.navigation.getParam('repoName')
    console.log(repoName)
    // await this.props.fetchRepoContentThunk(repoName)
  }

  render() {
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
          <Text>Repo name: {this.props.navigation.getParam('repoName')}</Text>
          <Text>Go to Repo Content</Text>
        </Body>
      </Container>
    )
  }
}

const mapState = state => ({
  content: state.dataReducer.selectedRepoContent,
})

const mapDispatch = dispatch => ({
  fetchRepoContentThunk: repoName => dispatch(fetchRepoContentThunk(repoName)),
})

export default connect(
  mapState,
  mapDispatch
)(SingleRepo)
