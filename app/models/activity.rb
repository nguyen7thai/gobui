class Activity < ApplicationRecord
  has_many :user_activities
  has_many :users , through: :user_activities

  def notify_user(from_user, to_user)
    NotificationCenter.notify(to_user.device_token, {
      id: id,
      name: name,
      description: description,
      accept_message: accept_message,
      deny_message: deny_message,
      voice_name: voice_name,
      from: from_user.username
    })
  end

  def notify_other_users(starter)
    users.where.not(id: starter.id).each do |user|
      notify_user(starter, user)
    end
  end
end
