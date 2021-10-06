class Tracker < ApplicationRecord
  belongs_to :exercise
  belongs_to :history
end
