import React from 'react'
import ReactDom from 'react-dom'
import CallBox from '../containers/CallBox'
import store from '../store'
import ChatBox from '../containers/ChatBox'
import SoundBox from '../components/sound_box'
import OnlineList from '../components/online_list'
import { Provider } from 'react-redux'

class ChatComponent extends React.Component {
  render() {
    return <div className='bebe-container'>
      <div className='communicate-container'>
        <Provider store={store}>
          <div>
            <CallBox />
            <ChatBox />
          </div>
        </Provider>
        <SoundBox />
      </div>
      <OnlineList />
    </div>
  }
}
window.renderChatComponent = () => {
  $(document).ready(() => {
    ReactDom.render(<ChatComponent />, $('#main')[0])
  }) 
}
