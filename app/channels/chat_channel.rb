class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'bebe_chat_channel'
    new_user = params[:username] || 'Người lạ'
    new_list = ListUsers.add_user current_user, new_user
    ActionCable.server.broadcast('bebe_chat_channel', {users_list: new_list.to_json, username: new_user, from: current_user})
  end

  def receive(data)
    data.merge!(from: current_user, from_username: ListUsers.all[current_user])
    ActionCable.server.broadcast('bebe_chat_channel', data)
  end

  def unsubscribed
    out_user = ListUsers.get_username current_user
    new_list = ListUsers.delete(current_user)
    ActionCable.server.broadcast('bebe_chat_channel', {out_user: current_user, username: out_user, from: current_user})
  end
end
