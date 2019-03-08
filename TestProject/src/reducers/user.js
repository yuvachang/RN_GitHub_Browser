import axios from 'axios'

const initialState = {
  user: {}
}

//actions
const LOGIN_USER = 'LOGIN_USER'


//action creators
const loginUser = (user) => ({
  type: LOGIN_USER,
  user
})

//thunk creators
export const loginUserThunk = () => {
  return async (dispatch) => {
    const { data } = await axios.get('https://github.com/login/oauth/authorize?client_id=1a61f1cb29b69ce48d77')
    dispatch(loginUser(data))
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
    return {...state, user: action.user}
    default:
      return state
  }
}

export default reducer