import Dispatcher from 'dispatcher'
let initChatChannel = () => {
  return App.cable.subscriptions.create(
    { 
      channel: "ChatChannel", userid: window.userId
    },
    {
      received: (data) => {
        if (!((data.to == 'others') && (data.from == window.userId))) {
          Dispatcher.publish(data.type, data)
        }
      }
    }
  )
}
export default initChatChannel 

