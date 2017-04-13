class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'bebe_chat_channel'
  end

  def receive(data)
    ActionCable.server.broadcast('bebe_chat_channel', data)
  end
end
