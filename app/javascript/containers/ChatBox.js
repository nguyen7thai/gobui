import ChatBoxComponent from '../components/ChatBoxComponent'
import { connect } from 'react-redux'
import { textChange, submitChat, updateMessagesList } from '../actions/chatBoxActions'

const mapStateToProps = (state) => {
  state = state.chatBox
  return {
    currentMessage: state.currentMessage,
    messages: state.messages
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    textChange: (text) => {
      dispatch(textChange(text))
    },
    submitChat: () => {
      dispatch(submitChat())
      dispatch(textChange(''))
    },
    updateMessagesList: (message) => {
      dispatch(updateMessagesList(message))
    },
    sendMessageSignal: (message) => {
      window.App.chatChannel.send({ type: 'message', content: message})
    }
  }
}

const ChatBox = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatBoxComponent)

export default ChatBox
