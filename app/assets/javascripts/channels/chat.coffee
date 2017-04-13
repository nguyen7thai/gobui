# app/assets/javascripts/cable/subscriptions/chat.coffee
gotDescription = (description) ->
  console.log 'gotdescription'
  peerConnection.setLocalDescription description, () -> 
    window.App.chatChannel.send {description: description}

gotIceCandidate = (event) ->
  console.log 'goticecandidate'
  if event.candidate
    window.App.chatChannel.send {ice: event.candidate}

gotRemoteStream = (event) ->
  console.log 'gotremotestream'
  window.remoteVideo.src = URL.createObjectURL(event.stream)

start = (isCaller) ->
  console.log 'start'
  window.peerConnection = new webkitRTCPeerConnection(
    { "iceServers": [{ "url": "stun:stun.l.google.com:19302" }] }
  )
  peerConnection.onicecandidate = gotIceCandidate
  peerConnection.onaddstream = gotRemoteStream
  peerConnection.addStream(window.localStream)
  if isCaller
    peerConnection.createOffer(gotDescription, () -> alert('error'))


window.userId = Date.now()
window.App.chatChannel = App.cable.subscriptions.create { channel: "ChatChannel" }, 
  received: (data) ->
    $mess = $('<div class="message"/>')
    if data.message
      $mess.text(data.message)
      $('#chat-messages').append $mess
    else
      console.log data
      if data.from != window.userId
        if data.call
          alert('Receive call')
        if !window.peerConnection
          start(false)
        if data.description
          remoteDescriptionCallback = () ->
            if data.description.type == 'offer'
              peerConnection.createAnswer(gotDescription, () -> alert('error'))

          peerConnection.setRemoteDescription(new RTCSessionDescription(data.description), remoteDescriptionCallback)
          console.log 'set remote description'
        if data.ice 
          console.log 'add ice candate'
          peerConnection.addIceCandidate(new RTCIceCandidate(data.ice))
       


$ ->
  $('form#chat-box').on 'submit', (e) ->
    e.preventDefault()
    $input = $('#chat-box input')
    window.App.chatChannel.send({message: $input.val()})
    $input.val('')

  $('#call-btn').on 'click', (e) ->
    e.preventDefault()
    start(true)
    window.App.chatChannel.send({
      from: userId
      call: 'call'
    })
  streamToAttach = null
  window.localVideo = $('#local-video')[0]
  window.remoteVideo = $('#remote-video')[0]
  navigator.webkitGetUserMedia { audio: true, video: true }, (stream)-> 
    localVideo.src = URL.createObjectURL(stream)
    window.localStream = stream
  , (error)-> 
    alert(error)


