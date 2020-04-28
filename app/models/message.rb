class Message < ApplicationRecord
  belongs_to :user
  belongs_to :room

  validates :room, presence: true
end
