import events from 'events'
let eventEmitter = new events.EventEmitter()
console.log('load new dispatcher')

let EventCenter = {
  subscribe: (event, callback) => {
    eventEmitter.on(event, callback)
  },

  publish: (event, payload) => {
    eventEmitter.emit(event, payload)
  }
}
export default EventCenter
