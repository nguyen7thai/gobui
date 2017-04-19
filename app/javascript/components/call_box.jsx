import React from 'react'
import ReactDom from 'react-dom'
import CallService from '../services/call_service'
import Dispatcher from '../dispatcher'

export default class CallBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      local_stream: '',
      remote_stream: '',
      calling: false
    }
    Dispatcher.subscribe('gotLocalStream', (stream) => {
      this.setState({calling: true, local_stream: URL.createObjectURL(stream)})
    })
    Dispatcher.subscribe('gotRemoteStream', (stream) => {
      this.setState({remote_stream: URL.createObjectURL(stream)})
    })
    Dispatcher.subscribe('exchange_description', (data) => {
      console.log(`Receive Call width video : ${data.hasVideo}`)
      CallService.getMediaAndAnswer(data, data.hasVideo)
    })
    Dispatcher.subscribe('exchange_ice', (data) => {
      if (CallService.peerConnection) {
        CallService.peerConnection.addIceCandidate(new RTCIceCandidate(data.ice))
      }
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
      this.setState({local_stream: '', remote_stream: '', calling: false})
    })
  }
  call(e, hasVideo=true) {
    e.preventDefault()
    CallService.askForCall(hasVideo)
  }
  endCall(e) {
    e.preventDefault()
    CallService.sendEndSignal()
    
  }
  render() {
    return  <div id='call-box'> Call Box Here
      <div id='videos'>
        <video src={this.state.local_stream} id='local-video' autoPlay muted controls />
        <video src={this.state.remote_stream} id='remote-video' autoPlay controls />
      </div>
      <div id='video-actions'>
        <div className={`${this.state.calling ? 'hidden' : ''}`}>
          <a id='btn-call' href='#' onClick={(e) => this.call(e)}>Video Call</a>
          <a id='btn-audio-call' href='#' onClick={(e) => this.call(e, false)}>Audio Call</a>
        </div>
        <div className={`${!this.state.calling ? 'hidden' : ''}`}>
          <a id='btn-end-cal' href='#' onClick={(e) => this.endCall(e)}>End Call</a>
        </div>
      </div>
    </div>
  }
}
