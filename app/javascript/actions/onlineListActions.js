export const UPDATE_ONLINE_LIST = 'UPDATE_ONLINE_LIST'

export function updateOnlineList(users) {
  return { type: UPDATE_ONLINE_LIST, users: users }
}

