import { SET_LOCAL_STREAM, SET_REMOTE_STREAM, END_CALL } from '../actions/callBoxActions'

const initialState = {
  localStream: '',
  remoteStream: '',
  calling: false
}

function callBoxReducer(state=initialState, action) {
  switch(action.type) {
    case(SET_LOCAL_STREAM):
      return Object.assign({}, state, {
        calling: true,
        localStream: action.stream
      })
    case(SET_REMOTE_STREAM):
      return Object.assign({}, state, {
        remoteStream: action.stream
      })
    case(END_CALL):
      return initialState
    default:
      return state
  }
}
export default callBoxReducer
