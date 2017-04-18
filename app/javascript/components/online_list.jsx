import React from 'react'
import ReactDom from 'react-dom'
import Dispatcher from '../dispatcher'

export default class OnlineList extends React.Component {
  constructor() {
    super()
    this.state = {
      users: {}
    }
    Dispatcher.subscribe('online_list', (data) => {
      if (data.from != window.userId) {
        alert(`JOINED: ${data.username}`)
      }
      this.setState({users: JSON.parse(data.users_list)})
    })
    Dispatcher.subscribe('out_user', (data) => {
      alert(`OUT: ${data.username}`)
      this.setState({users: JSON.parse(data.users_list)})
    })
  }
  render() {
    return <div className='online-list'>
      <h4>Online List</h4>
      <div className='list-users'>
        { Object.keys(this.state.users).map((id) => {
          return <div className='user' key={id}>
            {this.state.users[id]}
          </div>
        }) }
      </div>
    </div>
  }
}

