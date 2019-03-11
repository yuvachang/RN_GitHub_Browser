import React, { Component } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { fetchReposThunk } from '../reducers/data'
import HeaderC from './Header'
import styles from '../styles'
import {
  Icon,
  Container,
  Right,
  List,
  ListItem,
} from 'native-base'

class Repos extends Component {
  async componentDidMount() {
    await this.props.fetchReposThunk('all', 'created', 'owner')
  }

  render() {
    return (
      <Container style={{ flexDirection: 'column', justifyContent: 'center' }}>
        <HeaderC navigation={this.props.navigation} />
        {!this.props.repos[0] ? (
          <View
            style={{
              alignSelf: 'stretch',
              flex: 1,
            }}>
            <Text style={styles.title}>Loading repos...</Text>
          </View>
        ) : (
          <View
            style={{
              alignSelf: 'stretch',
              flex: 1,
            }}>
            <Text style={styles.title}>
              List of repos here:
            </Text>
            <ScrollView>
              <List>
                {this.props.repos.map(repo => {
                  return (
                    <ListItem key={repo.id}>
                      <Text
                        style={{ flex: 4 }}
                        onPress={() =>
                          this.props.navigation.navigate('SingleRepo', {
                            repoName: repo.name,
                          })
                        }>
                        {repo.name}
                      </Text>
                      <Right style={{ flex: 1 }}>
                        <Icon name='arrow-forward' />
                      </Right>
                    </ListItem>
                  )
                })}
              </List>
            </ScrollView>
          </View>
        )}
      </Container>
    )
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
