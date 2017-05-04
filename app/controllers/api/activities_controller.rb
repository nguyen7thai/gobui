module Api
  class ActivitiesController < BaseController
    # GET /api/users/:user_id/activities
    def index
      user = User.find_by(username: params[:user_id])
      activities = user.activities.includes(:users).map do |a|
        other_users = a.users.pluck(:username) - [user.username]
        a.attributes.merge(
          with_users: other_users
        )
      end
      render_ok(activities: activities)
    end

    # POST /api/users/:user_id/activities/:id/go
    def go
      user = User.find_by(username: params[:user_id]) 
      activity = user.activities.find_by(id: params[:id])
      activity.notify_other_users(user)
      render_ok
    end

    # POST /api/activities/:id/accept
    def accept
      activity = Activity.find params[:id]
      from = params[:from]
      to = params[:to]
      to_user = User.find_by(username: to)
      NotificationCenter.notify(to_user.device_token, {
        accept: true,
        from: from,
        message: activity.accept_message
      })
      render_ok
    end

    # POST /api/activites/:id/deny
    def deny
      activity = Activity.find params[:id]
      from = params[:from]
      to = params[:to]
      to_user = User.find_by(username: to)
      NotificationCenter.notify(to_user.device_token, {
        accept: false,
        from: from,
        message: activity.deny_message
      })
      render_ok
    end

    # POST /api/activities/:id/miss
    def miss
      activity = Activity.find params[:id]
      from = params[:from]
      to = params[:to]
      to_user = User.find_by(username: to)
      NotificationCenter.notify(to_user.device_token, {
        accept: false,
        from: from,
        message: "Missed the Go. No Answer" 
      })
      render_ok
    end
  end
end
