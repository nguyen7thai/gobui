import React from 'react'

class CallBoxComponent extends React.Component {
  constructor(props) {
    super(props)
    props.subscribeWebsocket()
  }
  render() {
    let props = this.props
    return  <div id='call-box'> Call Box Here
      <div id='videos'>
        <video src={props.localStream} id='local-video' autoPlay muted controls />
        <video src={props.remoteStream} id='remote-video' autoPlay controls />
      </div>
      <div id='video-actions'>
        <div className={`${props.calling ? 'hidden' : ''}`}>
          <a id='btn-call' href='#' onClick={(e) => { e.preventDefault(); props.call()}}>Video Call</a>
          <a id='btn-audio-call' href='#' onClick={(e) => {e.preventDefault(); props.call(false)}}>Audio Call</a>
        </div>
        <div className={`${!props.calling ? 'hidden' : ''}`}>
          <a id='btn-end-cal' href='#' onClick={(e) => {e.preventDefault(); props.endCall(e)}}>End Call</a>
        </div>
      </div>
    </div>
  }
}

export default CallBoxComponent
