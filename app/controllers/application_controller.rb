class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  def current_user
    cookies.signed[:user_id]
  end
  helper_method :current_user
end
