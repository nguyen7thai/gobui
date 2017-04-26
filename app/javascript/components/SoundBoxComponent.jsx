import React from 'react'
import Dispatcher from '../dispatcher'

export default class SoundBoxComponent extends React.Component {
  constructor(props) {
    super(props)
    Dispatcher.subscribe('play_sound', (data) => {
      let audio = new Audio(`/${data.file_name}`)
      audio.play()
    })
  }
  triggerSound(fileName) {
    return (e) => {
      e.preventDefault()
      window.App.chatChannel.send({type: 'play_sound', file_name: fileName})
    }
  }
  render() {
    return <div id='sound-box'>
      <a href='#' onClick={this.triggerSound('buzz.mp3')} >Buzz</a>
      <a href='#' onClick={this.triggerSound('bebe_voice.mp3')} >Go Bùi</a>
      <a href='#' onClick={this.triggerSound('thapbui_voice.wav')} >Go Tháp Bùi</a>
    </div>
  }
}

