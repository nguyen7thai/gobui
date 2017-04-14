class BebesController < ApplicationController
  def index
    unless current_user
      cookies.signed[:user_id] = Time.now.to_i.to_s
    end
  end
end
