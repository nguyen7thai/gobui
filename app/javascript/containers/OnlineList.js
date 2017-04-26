import { connect } from 'react-redux'
import OnlineListComponent from '../components/OnlineListComponent'
import { updateOnlineList } from '../actions/onlineListActions'
import callService from '../services/callService'
import store from '../store'
import { endCall } from '../actions/callBoxActions'
import Dispatcher from '../dispatcher'

const mapStateToProps = (state) => {
  return {
    users: state.onlineList.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    subscribeOnlineList: () => {
      Dispatcher.subscribe('online_list', (data) => {
        if (data.from != window.userId) {
          alert(`JOINED: ${data.username}`)
        }
        dispatch(updateOnlineList(JSON.parse(data.users_list)))
      })
    },
    subscribeOutUser: () => {
      Dispatcher.subscribe('out_user', (data) => {
        alert(`OUT: ${data.username}`)
        callService.endCall()
        store.dispatch(endCall())
        dispatch(updateOnlineList(JSON.parse(data.users_list)))
      })
    }
  }
}

const OnlineList = connect(
  mapStateToProps,
  mapDispatchToProps
)(OnlineListComponent)

export default OnlineList
