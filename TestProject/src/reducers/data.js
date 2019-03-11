import axios from 'axios'
import { AsyncStorage } from 'react-native'
import { grabUsername } from '../util'

const initialState = {
  repos: [],
  selectedRepoContent: [],
  stackCount: 0
}

//actions
const REPOS = 'REPOS'
const CONTENT = 'CONTENT'
const DESTACK = 'DESTACK'

//action creators
const gotRepos = repos => ({
  type: REPOS,
  repos,
})

const gotContent = content => ({
  type: CONTENT,
  content,
})

export const destack = () => ({
  type: DESTACK,
})

//thunk creators
export const fetchReposThunk = (visFilter, sortFilter, affiliation) => {
  return async dispatch => {
    try {
      let login64 = await AsyncStorage.getItem('login64')
      let config = JSON.parse(login64)
      const res = await axios.get(
        `https://api.github.com/user/repos?visibility=${visFilter}&affiliation=${affiliation}&sort=${sortFilter}&per_page=300`,
        config
      )
      const repos = res.data
      dispatch(gotRepos(repos))
    } catch (error) {
      console.log('fetchReposThunk error: ', error)
    }
  }
}

export const fetchRepoContentThunk = (repoName, dirName) => {
  return async dispatch => {
    try {
      let login64 = await AsyncStorage.getItem('login64')
      let config = JSON.parse(login64)
      let username = await grabUsername()
      // if dirName passed, access directory inside repo
      if (dirName) {
        console.log(
          'fetchRepoContentThunk: nested directory api call',
          dirName
        )
        let res = await axios.get(
          `https://api.github.com/repos/${username}/${repoName}/contents/${dirName}`,
          config
        )
        let content = res.data
        dispatch(gotContent(content))
        return
      }
      // otherwise access repo contents only
      else {
        console.log(
          'fetchRepoContentThunk: root directory api call',
          repoName,
          dirName
        )
        let res = await axios.get(
          `https://api.github.com/repos/${username}/${repoName}/contents/`,
          config
        )
        let content = res.data
        dispatch(gotContent(content))
        return
      }
    } catch (error) {
      console.log('fetchRepoContentThunk error: ', error)
    }
  }
}

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case DESTACK:
      if (state.selectedRepoContent[0]) {
        state.selectedRepoContent.pop()
      }
      return { ...state }
    case CONTENT:
      return {
        ...state,
        selectedRepoContent: [...state.selectedRepoContent, action.content],
        stackCount: state.stackCount++
      }
    case REPOS:
      return { ...state, repos: action.repos }
    default:
      return state
  }
}

export default dataReducer
