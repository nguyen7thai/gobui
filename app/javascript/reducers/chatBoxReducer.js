import { TEXT_CHANGE, SUBMIT_CHAT, UPDATE_MESSAGES_LIST } from '../actions/chatBoxActions'

const initialState = {
  messages: [],
  currentMessage: ''
}

function chatBoxReducer(state=initialState, action) {
  switch(action.type) {
    case(TEXT_CHANGE):
      return Object.assign({}, state, {
        currentMessage: action.text
      })
    case(SUBMIT_CHAT):
      return Object.assign({}, state, {
        currentMessage: ''
      })
    case(UPDATE_MESSAGES_LIST):
      return Object.assign({}, state, {
        messages: [...state.messages, action.message]
      })
    default:
      return state
  }
}
export default chatBoxReducer
