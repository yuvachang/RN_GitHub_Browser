import axios from 'axios'
import base64 from 'react-native-base64'
import { AsyncStorage } from 'react-native'

const initialState = {
  user: {},
  isLoggedIn: false,
  errorMessage: '',
  loading: false,
}

//actions
const LOGIN_USER = 'LOGIN_USER'
const LOGOUT = 'LOGOUT'
const ERROR = 'ERROR'
const LOADING = 'LOADING'

//action creators
export const loginUser = user => ({
  type: LOGIN_USER,
  user,
})

export const logout = () => ({
  type: LOGOUT,
})

const createError = error => ({
  type: ERROR,
  error,
})

export const loading = () => ({
  type: LOADING,
})

//thunk creators
export const loginUserThunk = login => {
  return async dispatch => {
    try {
      let encoded = base64.encode(`${login.email}:${login.password}`)
      let config = {
        headers: { Authorization: 'Basic ' + encoded },
      }
      const res = await axios.get('https://api.github.com/user', config)
      await AsyncStorage.setItem('login64', encoded)
      let storedUser = JSON.stringify(res.data)
      await AsyncStorage.setItem('userObj', storedUser)
      dispatch(loginUser(res.data))
    } catch (error) {
      let errMsg = JSON.parse(error.request._response).message
      console.log('caught error message: ', errMsg)
      dispatch(createError(errMsg))
    }
  }
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT:
      return {...state, user: {}, isLoggedIn: false}
    case LOADING:
      return { ...state, loading: true }
    case ERROR:
      return { ...state, errorMessage: action.error, loading: false}
    case LOGIN_USER:
      return { ...state, user: action.user, isLoggedIn: true, loading: false }
    default:
      return state
  }
}

export default userReducer

//actions
//action creators
//thunks
//reducer
//state
