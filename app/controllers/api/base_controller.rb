module Api
  class BaseController < ApplicationController
    protect_from_forgery with: :null_session, if: ->{request.format.json?}
    def render_ok(json={})
      render json: json, status: 200
    end

    def render_422 errors
      errors = [errors] unless errors.is_a? Array
      render json: { errors: errors }, status: 422
    end
  end
end
