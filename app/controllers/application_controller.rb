class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  rescue_from Exception, with: :render_500
  def current_user
    cookies.signed[:user_id]
  end
  helper_method :current_user

  def render_500 e
    if request.format.json?
      logger.error e.message
      logger.error e.backtrace.join("\n")
      render json: { errors: ['Something went wrong'] }, status: 500
    else
      raise e
    end
  end
end
