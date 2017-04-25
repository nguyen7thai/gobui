import chatBoxReducer from './chatBoxReducer'
import callBoxReducer from './callBoxReducer'
import { combineReducers } from 'redux'

const goperApp = combineReducers({
  chatBox: chatBoxReducer,
  callBox: callBoxReducer
})

export default goperApp
