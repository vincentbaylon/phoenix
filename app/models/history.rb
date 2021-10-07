class History < ApplicationRecord
  belongs_to :user
  belongs_to :routine
  belongs_to :workout

  has_many :trackers, dependent: :destroy
end
