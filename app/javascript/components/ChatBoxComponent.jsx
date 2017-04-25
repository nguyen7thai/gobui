import React from 'react'
import Dispatcher from '../dispatcher'

export default class ChatBoxComponent extends React.Component {
  constructor(props) {
    super(props) 
    Dispatcher.subscribe('message', (data) => {
      props.updateMessagesList({ sender: data.from_username, content: data.content }) 
    })
  }
  onSubmit(e) {
    e.preventDefault()
    this.props.sendMessageSignal(this.props.currentMessage)
    this.props.submitChat()
  }
  onChange(e) {
    this.props.textChange(e.target.value)
  }
  render() {
    return <div id='chat-box'> Chat Box Here
      <div id='chat-messages'>
        {
          this.props.messages.map((message, index) => {
            return <div className='message' key={index}>
              <b>{`${message.sender}: `}</b>
              <span>{message.content}</span>
            </div>
          })
        }
      </div>
      <form onSubmit={(e) => this.onSubmit(e)} id='chat-box-form'>
        <input type='text' onChange={(e) => this.onChange(e)} value={this.props.currentMessage} placeholder='Enter to send' />
      </form>
    </div>
  }
}
