let getMedia = (hasVideo = true) => {
  return new Promise((resolve, reject) => {
    if (!window.peerConnection)
      navigator.webkitGetUserMedia(
        { 
          audio: true, video: hasVideo 
        }, (stream) => {
          localVideo.src = URL.createObjectURL(stream)
          window.localStream = stream
          resolve()
        }, (error) => {
          alert(error)
        }
      ) 
    else
      resolve()
  })
}

let endCall = () => {
  peerConnection.close()
  localStream.getTracks().forEach((track) => {
    track.stop()
  })
  localVideo.src = ''
  remoteVideo.src = ''
  $('#call-btn').removeClass('hidden')
  $('#no-video').removeClass('hidden')
  $('#btn-end-call').addClass('hidden')
}

let gotDescription = (description) => {
  console.log('gotdescription')
  let hasVideo = !$('#no-video').is(':checked')
  peerConnection.setLocalDescription(description, () => {
    window.App.chatChannel.send({description: description, from: userId, hasVideo: hasVideo})
  })
}

let gotIceCandidate = (event) => {
  console.log('goticecandidate')
  if (event.candidate)
    window.App.chatChannel.send({ice: event.candidate, from: userId})
}

let gotRemoteStream = (event) => {
  console.log('gotremotestream')
  window.remoteVideo.src = URL.createObjectURL(event.stream)
}

let start = (isCaller) => {
  $('#call-btn').addClass('hidden')
  $('#no-video').addClass('hidden')
  $('#btn-end-call').removeClass('hidden')
  console.log("start")
  window.peerConnection = new webkitRTCPeerConnection(
    { "iceServers": [{ "url": "stun:stun.l.google.com:19302" }] }
  )
  peerConnection.onicecandidate = gotIceCandidate
  peerConnection.onaddstream = gotRemoteStream
  peerConnection.addStream(window.localStream)
  if ( isCaller )
    peerConnection.createOffer(gotDescription, () => alert('error'))
}
let urlParams = new URLSearchParams(window.location.search)
window.App.chatChannel = App.cable.subscriptions.create(
  { 
    channel: "ChatChannel", username: urlParams.get('username'), userid: window.userId
  },
  {
    received: (data) => {
      if (data.message) {
        console.log('receive message')
        let $mess = $('<div class="message"/>')
        $mess.append($(`<b>${data.from_username}: </b>`))
        $mess.append(data.message)
        $('#chat-messages').append($mess)
      } else if (data.out_user) {
        alert('OUT: ' + data.username)
        if (data.from != window.userId)
          $(`#user-${data.out_user}`).remove()
      }
      else if (data.users_list) {
        if (data.from != window.userId)
          alert('JOINED: ' + data.username)
        let list = JSON.parse(data.users_list)
        $('.list-users').html('')
        $.each(list, (id, user) => {
          let $user = $('<div class="user" />')
          $user.attr('id', "user-#{id}")
          $user.text(user)
          $('.list-users').append($user)
        })
      } else if (data.buzz) {
        $(data.audio)[0].play()
      } else if(data.ice) {
        if(data.from != window.userId && window.peerConnection) {
          console.log('add ice candate')
          window.peerConnection.addIceCandidate(new RTCIceCandidate(data.ice))
        }
      } else if(data.description) {
        if(data.from != window.userId) {
          getMedia(data.hasVideo).then(() => {
            if(!window.peerConnection)
              start(false)
            alert('Received call')
            let remoteDescriptionCallback = () => {
              if (data.description.type == 'offer')
                peerConnection.createAnswer(gotDescription, () => alert('error'))
            }
            window.peerConnection.setRemoteDescription(new RTCSessionDescription(data.description), remoteDescriptionCallback)
            console.log('set remote description')
          })
        }
      } else if (data.end_call && data.from != window.userId) {
        endCall()
        alert('Call End')
      } else if (data.calling && data.from != window.userId) {
        if (confirm('Incomming Call. Receive?'))
          getMedia(!data.no_video).then(() => start(true))
        else
          console.log('Rejected call')
      }
    }
  }
)

$(() => {
  $('form#chat-box').on('submit', (e) => {
    e.preventDefault()
    let $input = $('#chat-box input')
    window.App.chatChannel.send({message: $input.val()})
    $input.val('')
  })

  let streamToAttach = null
  window.localVideo = $('#local-video')[0]
  window.remoteVideo = $('#remote-video')[0]

  $('#call-btn').on('click', (e) => {
    e.preventDefault()
    let noVideo = $('#no-video').is(':checked')
    window.App.chatChannel.send({calling: 'calling', no_video: noVideo})
  })

  $('.btn-voice').on('click', function(e) {
    console.log('voice')
    e.preventDefault()
    window.App.chatChannel.send({buzz: 'buzz', audio: $(this).data('audio')})
  })

  $('#btn-end-call').on('click', (e) => {
    e.preventDefault()
    endCall()
    window.App.chatChannel.send({ end_call: 'end_call' })
  })
})
