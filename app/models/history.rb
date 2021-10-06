class History < ApplicationRecord
  belongs_to :user
  belongs_to :routine

  has_many :trackers, dependent: :destroy
end
