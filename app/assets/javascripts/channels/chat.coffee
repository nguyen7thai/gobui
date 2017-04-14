# app/assets/javascripts/cable/subscriptions/chat.coffee
# getMedia = (hasVideo) ->
#   , (error)->
#     alert(error)

getMedia = (hasVideo = true) ->
  new Promise((resolve, reject) ->
    if !window.peerConnection
      navigator.webkitGetUserMedia { audio: true, video: hasVideo }, (stream)->
        localVideo.src = URL.createObjectURL(stream)
        window.localStream = stream
        resolve()
      , (error) ->
        alert error
    else
      resolve()
)

gotDescription = (description) ->
  console.log 'gotdescription'
  hasVideo = !$('#no-video').is(':checked')
  peerConnection.setLocalDescription description, () -> 
    window.App.chatChannel.send {description: description, from: userId, hasVideo: hasVideo}

gotIceCandidate = (event) ->
  console.log 'goticecandidate'
  if event.candidate
    window.App.chatChannel.send {ice: event.candidate, from: userId}

gotRemoteStream = (event) ->
  console.log 'gotremotestream'
  window.remoteVideo.src = URL.createObjectURL(event.stream)
start = (isCaller) ->
  $('#call-btn').addClass('hidden')
  $('#no-video').addClass('hidden')
  console.log 'start'
  window.peerConnection = new webkitRTCPeerConnection(
    { "iceServers": [{ "url": "stun:stun.l.google.com:19302" }] }
  )
  peerConnection.onicecandidate = gotIceCandidate
  peerConnection.onaddstream = gotRemoteStream
  peerConnection.addStream(window.localStream)
  if isCaller
    peerConnection.createOffer(gotDescription, () -> alert('error'))

urlParams = new URLSearchParams(window.location.search)
window.App.chatChannel = App.cable.subscriptions.create { channel: "ChatChannel", username: urlParams.get('username'), userid: window.userId },
  received: (data) ->
    if data.message
      console.log 'receive message'
      $mess = $('<div class="message"/>')
      $mess.append($("<b>#{data.from_username}: </b>"))
      $mess.append(data.message)
      $('#chat-messages').append $mess
    else if data.out_user
      alert('OUT: ' + data.username)
      if data.from != window.userId
        $("#user-#{data.out_user}").remove()
    else if data.users_list
      if data.from != window.userId
        alert('JOINED: ' + data.username)
      list = JSON.parse(data.users_list)
      $('.list-users').html('')
      $.each list, (id, user) ->
        $user = $('<div class="user" />')
        $user.attr('id', "user-#{id}")
        $user.text(user)
        $('.list-users').append($user)
    else
      console.log data
      if data.from != window.userId
        getMedia(data.hasVideo).then () ->
          if !window.peerConnection
            start(false)
          if data.description
            alert('Receive call')
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

  streamToAttach = null
  window.localVideo = $('#local-video')[0]
  window.remoteVideo = $('#remote-video')[0]

  $('#call-btn').on 'click', (e) ->
    e.preventDefault()
    noVideo = $('#no-video').is(':checked')
    getMedia(!noVideo).then () ->
      start(true)

  # $('#no-video').on 'click', (e) ->
  #   e.preventDefault()
  #   window.localStream.getVideoTracks()[0].stop()
  #   $('#videos').addClass('hidden')
  # getMedia true

