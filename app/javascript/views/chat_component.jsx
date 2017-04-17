import React from 'react'
import ReactDom from 'react-dom'
import CallBox from '../components/call_box'
import ChatBox from '../components/chat_box'
import SoundBox from '../components/sound_box'

class ChatComponent extends React.Component {
  render() {
    return <div className='bebe-container'>
      <div className='communicate-container'>
        <CallBox />
        <ChatBox />
        <SoundBox />
      </div>
    </div>
  }
}
window.renderChatComponent = () => {
  $(document).ready(() => {
    ReactDom.render(<ChatComponent />, $('#main')[0])
  }) 
}
