module Api
  class UsersController < BaseController
    def create
      if User.find_by(username: user_params[:username])
        return render_422 "Username was taken"
      end
      user = User.new(user_params) 
      if user.save
        render_ok(user_id: user.id)
      else
        render_422 "Cannot create user"
      end
    end

    private
    def user_params
      params.require(:user).permit(:username, :email, :password, :device_token)
    end
  end
end
