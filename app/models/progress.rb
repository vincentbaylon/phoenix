class Progress < ApplicationRecord
  has_many :user_progresses
  has_many :users, through: :user_progresses
end
