import React, { Component } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { Container, Body, List, ListItem } from 'native-base'
import HeaderC from './Header'
import styles from '../styles'
import { fetchIssuesThunk } from '../reducers/data'

class Home extends Component {
  async componentDidMount() {
    if (!this.props.user.id) {
      this.props.navigation.navigate('Loading')
    } else {
      await this.props.fetchIssuesThunk()
    }
  }

  render() {
    return (
      <Container>
        <HeaderC navigation={this.props.navigation} />
        <Text style={styles.title}>Welcome {this.props.user.login}.</Text>
        <Text style={{ textAlign: 'center' }}>Recent activity:</Text>
        <View />
        <ScrollView
          style={{
            alignSelf: 'center',
            flex: 1,
          }}>
          {this.props.issues.map(issue => {
            return (
              <ListItem key={issue.id}>
                <Text>
                  {issue.title}: by {issue.user.login}
                </Text>
              </ListItem>
            )
          })}
          <List />
        </ScrollView>
      </Container>
    )
  }
}

const mapState = state => ({
  user: state.userReducer.user,
  issues: state.dataReducer.issues,
})

const mapDispatch = dispatch => ({
  fetchIssuesThunk: () => dispatch(fetchIssuesThunk()),
})

export default connect(
  mapState,
  mapDispatch
)(Home)
