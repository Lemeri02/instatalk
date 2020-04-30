class AppearanceChannel < ApplicationCable::Channel
  def subscribed
    stream_from "appearance_channel"

    current_user_appear

    update_online_status
  end

  def unsubscribed
    current_user_away

    update_online_status
  end

  def away
    current_user_away

    update_online_status
  end

  def update_online_status
    ActionCable.server.broadcast "appearance_channel", user: current_user
  end

  private

  def current_user_away
    current_user.update!(status: false)
  end


  def current_user_appear
    current_user.update!(status: true)
  end
end
