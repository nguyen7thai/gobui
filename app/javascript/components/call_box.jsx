import React from 'react'
import ReactDom from 'react-dom'
import CallService from '../services/call_service'
import Dispatcher from '../dispatcher'

export default class CallBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      local_stream: null,
      remote_stream: null
    }
    Dispatcher.subscribe('gotLocalStream', (stream) => {
      this.setState({local_stream: URL.createObjectURL(stream)})
    })
    Dispatcher.subscribe('gotRemoteStream', (stream) => {
      this.setState({remote_stream: URL.createObjectURL(stream)})
    })
    Dispatcher.subscribe('exchange_description', (data) => {
      CallService.getMediaAndAnswer(data)
    })
    Dispatcher.subscribe('exchange_ice', (data) => {
      if (CallService.peerConnection) {
        CallService.peerConnection.addIceCandidate(new RTCIceCandidate(data.ice))
      }
    })
  }
  call() {
    CallService.getMediaAndStart()
  }
  render() {
    return  <div> Call Box Here
      <div id='#videos'>
        <video src={this.state.local_stream} id='local-video' autoPlay muted controls />
        <video src={this.state.remote_stream} id='remote-video' autoPlay controls />
      </div>
      <div id='video-actions'>
        <a id='btn-call' href='#' onClick={this.call}>Call</a>
      </div>
    </div>
  }
}
