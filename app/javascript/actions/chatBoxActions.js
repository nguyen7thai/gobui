export const TEXT_CHANGE = 'TEXT_CHANGE'
export const SUBMIT_CHAT = 'SUBMIT_CHAT'
export const UPDATE_MESSAGES_LIST = 'UPDATE_MESSAGES_LIST'

export function textChange(text) {
  return { type: TEXT_CHANGE, text }
}

export function submitChat() {
  return { type: SUBMIT_CHAT }
}

export function updateMessagesList(message) {
  return { type: UPDATE_MESSAGES_LIST, message }
}
