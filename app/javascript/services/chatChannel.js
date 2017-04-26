import Dispatcher from 'dispatcher'
let urlParams = new URLSearchParams(window.location.search)
let initChatChannel = () => {
  return App.cable.subscriptions.create(
    { 
      channel: "ChatChannel", userid: window.userId, username: urlParams.get('username')
    },
    {
      received: (data) => {
        if (!((data.to == 'others') && (data.from == window.userId))) {
          console.log(`Publish: ${data.type}`)
          Dispatcher.publish(data.type, data)
        }
      }
    }
  )
}
export default initChatChannel 

