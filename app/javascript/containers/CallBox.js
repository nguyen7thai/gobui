import CallService from '../services/call_service'
import Dispatcher from '../dispatcher'
import { setLocalStream, setRemoteStream, endCall } from '../actions/callBoxActions'
import CallBoxComponent from '../components/CallBoxComponent'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  state = state.callBox
  return {
    calling: state.calling,
    localStream: state.localStream,
    remoteStream: state.remoteStream
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    call: (hasVideo=true) => {
      CallService.askForCall(hasVideo)
    },
    endCall: () => {
      CallService.sendEndSignal()
    },
    subscribeWebsocket: () => {
      Dispatcher.subscribe('gotLocalStream', (stream) => {
        dispatch(setLocalStream(URL.createObjectURL(stream)))
      })
      Dispatcher.subscribe('gotRemoteStream', (stream) => {
        dispatch(setRemoteStream(URL.createObjectURL(stream)))
      })
      Dispatcher.subscribe('exchange_description', (data) => {
        console.log(`Receive Call width video : ${data.hasVideo}`)
        CallService.getMediaAndAnswer(data, data.hasVideo)
      })
      Dispatcher.subscribe('exchange_ice', (data) => {
        CallService.addIceCandidate(data.ice)
      })
      Dispatcher.subscribe('ask_for_call', (data) => {
        if (confirm('Incomming Call. Receive?')) {
          CallService.getMediaAndStart(data.has_video)
        } else {
          console.log('Rejected call')
        }
      })
      Dispatcher.subscribe('end_call', () => {
        CallService.endCall()
        dispatch(endCall())
      })
    }
  }
}

const CallBox = connect(
  mapStateToProps,
  mapDispatchToProps
)(CallBoxComponent)

export default CallBox
