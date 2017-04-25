export const SET_LOCAL_STREAM = 'SET_LOCAL_STREAM'
export const SET_REMOTE_STREAM = 'SET_REMOTE_STREAM'
export const END_CALL = 'END_CALL'

export function setLocalStream(stream) {
  return { type: SET_LOCAL_STREAM, stream }
}

export function setRemoteStream(stream) {
  return { type: SET_REMOTE_STREAM, stream }
}

export function endCall() {
  return { type: END_CALL }
}
