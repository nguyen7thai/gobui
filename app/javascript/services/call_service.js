import Dispatcher from '../dispatcher'

class CallService {
  askForCall(hasVideo=true) {
    window.App.chatChannel.send({type: 'ask_for_call', has_video: hasVideo, to: 'others'})
  }
  endCall() {
    this.peerConnection.close()
    this.peerConnection = null
    this.localStream.getTracks().forEach((track)  => {
      track.stop()
    })
  }
  sendEndSignal() {
    window.App.chatChannel.send({type: 'end_call'})
  }
  start(isCaller=true) {
    this.peerConnection = new RTCPeerConnection(
      { "iceServers": [{ "url": "stun:stun.l.google.com:19302" }] }
    )
    this.peerConnection.onicecandidate = this.gotIceCandidate
    this.peerConnection.onaddstream = this.gotRemoteStream
    this.peerConnection.addStream(this.localStream)
    if (isCaller) {
      this.peerConnection.createOffer(this.gotDescription.bind(this), () => alert('Create Offer Error'))
    }
  }
  gotDescription(description) {
    let hasVideo = this.hasVideo
    this.peerConnection.setLocalDescription(description, () => {
      window.App.chatChannel.send({type: 'exchange_description', to: 'others', description: description, hasVideo: hasVideo})
    })
  }
  gotIceCandidate(event) {
    if (event.candidate) {
      window.App.chatChannel.send({type: 'exchange_ice', to: 'others', ice: event.candidate})
    }
  }
  gotRemoteStream(event) {
    Dispatcher.publish('gotRemoteStream', event.stream)
  }
  getMedia(hasVideo=true) {
    return new Promise((resolve, reject) => {
      if (!this.peerConnection) {
        navigator.getUserMedia(
          { 
            audio: true, video: hasVideo 
          }, (stream) => {
            this.localStream = stream
            console.log('publish gotLocalStream')
            Dispatcher.publish('gotLocalStream', stream)
            resolve()
          }, (error) =>  alert(error)
        )
      } else {
        resolve()
      }
    })
  }
  getMediaAndStart(hasVideo=true) {
    this.hasVideo = hasVideo
    this.getMedia(hasVideo).then(() => this.start(true))
  }
  getMediaAndAnswer(data, hasVideo=true) {
    this.hasVideo = hasVideo
    this.getMedia(hasVideo).then(() => {
      if (!this.peerConnection) {
        this.start(false)
        alert('Received call')
      }
      let remoteDescriptionCallback = () => {
        if (data.description.type == 'offer')
          this.peerConnection.createAnswer(this.gotDescription.bind(this), () => alert('error'))
      }
      this.peerConnection.setRemoteDescription(new RTCSessionDescription(data.description), remoteDescriptionCallback)
    })
  }
}

export default new CallService
