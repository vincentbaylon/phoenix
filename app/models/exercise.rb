class Exercise < ApplicationRecord
  has_many :user_exercises, dependent: :destroy
  has_many :users, through: :user_exercises
  has_many :workout_exercises, dependent: :destroy
  has_many :workouts, through: :workout_exercises
  has_many :trackers, dependent: :destroy
end
