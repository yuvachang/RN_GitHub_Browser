import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import loggingMiddleware from 'redux-logger'
import axios from 'axios'
import {reducer as user} from './user'

const rootReducer = combineReducers({
  user,
})

const store = createStore(
  rootReducer,
  applyMiddleware(
    // `withExtraArgument` gives us access to axios in our async action creators!
    // https://github.com/reduxjs/redux-thunk#injecting-a-custom-argument
    thunkMiddleware.withExtraArgument({ axios }),
    loggingMiddleware
  )
)

export default store
