class Progress < ApplicationRecord
  has_many :user_progresses, dependent: :destroy
  has_many :users, through: :user_progresses
end
