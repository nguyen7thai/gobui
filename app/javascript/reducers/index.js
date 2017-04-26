import chatBoxReducer from './chatBoxReducer'
import callBoxReducer from './callBoxReducer'
import onlineListReducer from './onlineListReducer'
import { combineReducers } from 'redux'

const goperApp = combineReducers({
  chatBox: chatBoxReducer,
  callBox: callBoxReducer,
  onlineList: onlineListReducer
})

export default goperApp
