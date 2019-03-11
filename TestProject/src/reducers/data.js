import axios from 'axios'
import { AsyncStorage } from 'react-native'
import {grabUsername} from '../util'

const initialState = {
  repos: [],
  selectedRepoContent: []
}

//actions
const REPOS = 'REPOS'

//action creators
const gotRepos = repos => ({
  type: REPOS,
  repos,
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
      // console.log('repos fetched: ', res.data)
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

    } catch (error) {
      console.log('fetchRepoContentThunk errror: ', error)
    }
  }
}

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case REPOS:
      return { ...state, repos: action.repos }
    default:
      return state
  }
}

export default dataReducer
