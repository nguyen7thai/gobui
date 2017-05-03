module Api
  class SessionsController < BaseController
    def create
      if user = User.find_by(username: session_params[:username]) 
        if user.password == session_params[:password]
          token = session_params['device_token']
          if token && user.device_token != token
            user.device_token = token
            user.save
          end
          return render_ok(user_id: user.id, device_token: user.device_token, username: user.username)
        end
      end
      render_422 'Invalid username/password'
    end

    private
    def session_params
      params.require(:session).permit(:username, :password, :device_token)
    end
  end
end
