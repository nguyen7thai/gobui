import React from 'react'

export default class OnlineListComponent extends React.Component {
  constructor(props) {
    super(props)
    props.subscribeOnlineList()
    props.subscribeOutUser()
  }
  render() {
    return <div className='online-list'>
      <h4>Online List</h4>
      <div className='list-users'>
        { Object.keys(this.props.users).map((id) => {
          return <div className='user' key={id}>
            {this.props.users[id]}
          </div>
        }) }
      </div>
    </div>
  }
}

