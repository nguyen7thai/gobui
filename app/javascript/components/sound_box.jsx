import React from 'react'
import ReactDom from 'react-dom'
import Dispatcher from '../dispatcher'

export default class SoundBox extends React.Component {
  constructor() {
    super()
    Dispatcher.subscribe('play_sound', (data) => {
      let audio = new Audio(`/assets/${data.file_name}`)
      audio.play()
    })
  }
  triggerSound(fileName) {
    return () => {
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

