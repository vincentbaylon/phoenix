class Routine < ApplicationRecord
  has_many :routine_workouts
  has_many :workouts, through: :routine_workouts
  has_many :user_routines
  has_many :users, through: :user_routines
end
