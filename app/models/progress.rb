class Progress < ApplicationRecord
  belongs_to :user

  has_many :user_progresses
  has_many :users, through: :user_progresses
end
