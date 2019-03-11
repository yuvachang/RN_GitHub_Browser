import React, { Component } from 'react'
import { ScrollView, Text, View, Button } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { fetchReposThunk } from '../reducers/data'
import styles from '../styles'
import {
  Icon,
  Header,
  Container,
  Left,
  Body,
  Right,
  List,
  ListItem,
} from 'native-base'

class Repos extends Component {
  async componentDidMount() {
    await this.props.fetchReposThunk('all', 'created', 'owner')
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
        <Container style={{flexDirection: 'column', justifyContent: 'center'}}>
          <Header style={{ backgroundColor: 'grey', alignSelf: 'stretch'}}>
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
          <View style={{
            alignSelf: 'stretch',
            flex: 1
            }}>
            <Text style={{ fontSize: 18, textAlign: 'center' }}>List of repos here:</Text>
            <ScrollView>
              <List>
                {this.props.repos.map(repo => {
                  return (
                    <ListItem key={repo.id}>
                      <Text
                      style={{flex: 4}}
                        onPress={() =>
                          this.props.navigation.navigate('SingleRepo', {
                            repoName: repo.name,
                          })
                        }>
                        {repo.name}
                      </Text>
                      <Right style={{flex: 1}}>
                        <Icon name='arrow-forward' />
                      </Right>
                    </ListItem>
                  )
                })}
              </List>
            </ScrollView>
          </View>
        </Container>
      )
    }
  }
}

const mapState = state => ({
  repos: state.dataReducer.repos,
})

const mapDispatch = dispatch => ({
  fetchReposThunk: (visFilter, sortFilter, affiliation) =>
    dispatch(fetchReposThunk(visFilter, sortFilter, affiliation)),
})

export default connect(
  mapState,
  mapDispatch
)(Repos)
