class BebesController < ApplicationController
  def index
    cookies.signed[:user_id] = Time.now.to_i.to_s
  end
end
