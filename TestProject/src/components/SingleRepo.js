import React, { Component } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { fetchRepoContentThunk, destack } from '../reducers/data'
import { Icon, Container, Right, List, ListItem } from 'native-base'
import HeaderC from './Header'
import styles from '../styles'

const keygen = (function() {
  let i = 0
  return () => {
    i++
    return i
  }
})()

class SingleRepo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      repoName: this.props.navigation.getParam('repoName'),
      dirName: this.props.navigation.getParam('dirName'),
    }
    this.handlePress = this.handlePress.bind(this)
  }

  handlePress(name) {
    if (!this.state.dirName) {
      this.props.navigation.push('SingleRepo', {
        dirName: name,
        repoName: this.state.repoName,
      })
    } else if (this.state.dirName) {
      this.props.navigation.push('SingleRepo', {
        dirName: this.state.dirName.concat(`/${name}`),
        repoName: this.state.repoName,
      })
    }
  }

  componentWillUnmount() {
    this.props.destack()
  }

  async componentDidMount() {
    this.props.navigation.addListener('didFocus', payload => {
      this.forceUpdate()
    })
    i  f (this.state.dirName) {
      await this.props.fetchRepoContentThunk(
        this.state.repoName,
        this.state.dirName
      )
    } else {
      await this.props.fetchRepoContentThunk(this.state.repoName)
    }
  }

  render() {
    return (
      <Container>
        <HeaderC navigation={this.props.navigation} />
        <Text style={styles.title}>{this.state.repoName}</Text>
        <View
          style={{
            alignSelf: 'stretch',
            flex: 1,
          }}>
          {!this.state.dirName && (
            <Text style={{ textAlign: 'center' }}>Content:</Text>
          )}
          {!!this.state.dirName && (
            <Text style={{ textAlign: 'center' }}>{this.state.dirName}:</Text>
          )}
          <ScrollView>
            {!Array.isArray(this.props.content[0]) ? (
              <Text>Loading...</Text>
            ) : (
              <List>
                {this.props.content[this.props.content.length - 1].map(
                  content => {
                    if (content.type === 'dir') {
                      return (
                        <ListItem key={keygen()}>
                          <Text
                            style={{ flex: 4 }}
                            onPress={() => this.handlePress(content.name)}>
                            {content.name}
                          </Text>
                          <Right style={{ flex: 1 }}>
                            <Icon name='arrow-forward' />
                          </Right>
                        </ListItem>
                      )
                    } else {
                      return (
                        <ListItem key={keygen()}>
                          <Text>{content.name}</Text>
                        </ListItem>
                      )
                    }
                  }
                )}
              </List>
            )}
          </ScrollView>
        </View>
      </Container>
    )
  }
}

const mapState = state => ({
  content: state.dataReducer.selectedRepoContent,
})

const mapDispatch = dispatch => ({
  fetchRepoContentThunk: (repoName, dirName) =>
    dispatch(fetchRepoContentThunk(repoName, dirName)),
  destack: () => dispatch(destack()),
})

export default connect(
  mapState,
  mapDispatch
)(SingleRepo)
