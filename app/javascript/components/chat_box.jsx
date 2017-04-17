import React from 'react'
import ReactDom from 'react-dom'
import Dispatcher from '../dispatcher'

export default class ChatBox extends React.Component {
  constructor() {
    super()
    Dispatcher.subscribe('message', (data) => {
      let messages = this.state.messages
      messages.push({ sender: data.from_username, content: data.content })
      this.setState({messages: messages})
    })
    this.state = {
      messages: [],
      current_message: ''
    }
  }
  onSubmit(e) {
    e.preventDefault()
    window.App.chatChannel.send({ type: 'message', content: this.state.current_message})
    this.setState({current_message: ''})
  }
  onTextChange(e) {
    this.setState({current_message: e.target.value})
  }
  render() {
    return <div id='chat-box'> Chat Box Here
      <div id='chat-messages'>
        {
          this.state.messages.map((message, index) => {
            return <div className='message' key={index}>
              <b>{`${message.sender}: `}</b>
              <span>{message.content}</span>
            </div>
          })
        }
      </div>
      <form onSubmit={(e) => this.onSubmit(e)} id='chat-box-form'>
        <input type='text' onChange={(e) => this.onTextChange(e)} value={this.state.current_message} placeholder='Enter to send' />
      </form>
    </div>
  }
}
