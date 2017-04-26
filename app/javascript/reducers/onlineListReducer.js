import { UPDATE_ONLINE_LIST } from '../actions/onlineListActions'

const initialState = {
  users: []
}

function onlineListReducer(state=initialState, action) {
  switch(action.type) {
    case(UPDATE_ONLINE_LIST):
      return Object.assign({}, state, {
        users: action.users
      })
    default:
      return state
  }
}

export default onlineListReducer
