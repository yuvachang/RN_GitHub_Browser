import axios from 'axios'
import { AsyncStorage } from 'react-native'
import {grabUsername} from '../util'

const initialState = {
  repos: [],
  selectedRepoContent: []
}

//actions
const REPOS = 'REPOS'
const CONTENT = 'CONTENT'

//action creators
const gotRepos = repos => ({
  type: REPOS,
  repos,
})

const gotContent = content => ({
  type: CONTENT,
  content
})

//thunk creators
export const fetchReposThunk = (visFilter, sortFilter, affiliation) => {
  return async dispatch => {
    try {
      console.log(visFilter, sortFilter, affiliation)
      let login64 = await AsyncStorage.getItem('login64')
      let config = JSON.parse(login64)
      console.log(config)
      const res = await axios.get(
        `https://api.github.com/user/repos?visibility=${visFilter}&affiliation=${affiliation}&sort=${sortFilter}&per_page=300`,
        config
      )
      const repos = res.data
      dispatch(gotRepos(repos))
    } catch (error) {
      console.log('fetchReposThunk errror: ', error)
    }
  }
}

export const fetchRepoContentThunk = (repoName) => {
  return async dispatch => {
    try {
      let login64 = await AsyncStorage.getItem('login64')
      let config = JSON.parse(login64)
      let username = await grabUsername() 
      let res = await axios.get(`https://api.github.com/repos/${username}/${repoName}/contents/`, config)
      let content = res.data
      dispatch(gotContent(content))
    } catch (error) {
      console.log('fetchRepoContentThunk errror: ', error)
    }
  }
}

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONTENT: 
      return {...state, selectedRepoContent: action.content}
    case REPOS:
      return { ...state, repos: action.repos }
    default:
      return state
  }
}

export default dataReducer
