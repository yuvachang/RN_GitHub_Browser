import axios from 'axios'
import base64 from 'react-native-base64'
import { AsyncStorage } from 'react-native'

const initialState = {
  user: {},
  isLoggedIn: false,
}

//actions
const LOGIN_USER = 'LOGIN_USER'

//action creators
const loginUser = user => ({
  type: LOGIN_USER,
  user,
})

//thunk creators
export const loginUserThunk = login => {
  return async dispatch => {
    try {
      console.log(login)
      let encoded = base64.encode(`${login.email}:${login.password}`)
      let config = {
        headers: { Authorization: 'Basic ' + encoded },
      }
      const res = await axios.get('https://api.github.com/user/', config)
      console.log(res)
      AsyncStorage.setItem('loginHeader', encoded)
      
    } catch (error) {
      console.log('hello error', error)
    }
  }
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, user: action.user }
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
