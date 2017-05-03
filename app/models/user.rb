class User < ApplicationRecord
  validates :username, presence: true
  has_many :user_activities
  has_many :activities, through: :user_activities
end
