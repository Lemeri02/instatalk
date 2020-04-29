class AppearanceChannel < ApplicationCable::Channel
  def subscribed
    stream_from "appearance_channel"

    current_user.update!(status: true)

    appear
  end

  def unsubscribed
    current_user.update!(status: false)

    appear
  end

  def appear
    ActionCable.server.broadcast "appearance_channel", user: current_user
  end
end
