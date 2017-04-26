import React from 'react'
import ReactDom from 'react-dom'
import CallBox from '../containers/CallBox'
import store from '../store'
import ChatBox from '../containers/ChatBox'
import SoundBoxComponent from '../components/SoundBoxComponent'
import OnlineList from '../containers/OnlineList'
import { Provider } from 'react-redux'

class CommunicateComponent extends React.Component {
  render() {
    return <Provider store={store}>
      <div className='bebe-container'>
        <div className='communicate-container'>
          <CallBox />
          <ChatBox />
          <SoundBoxComponent />
        </div>
        <OnlineList />
      </div>
    </Provider>
  }
}
window.renderCommunicateComponent = () => {
  $(document).ready(() => {
    ReactDom.render(<CommunicateComponent />, $('#main')[0])
  }) 
}
