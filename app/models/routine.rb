class Routine < ApplicationRecord
  has_many :routine_workouts, dependent: :destroy
  has_many :workouts, through: :routine_workouts
  has_many :user_routines, dependent: :destroy
  has_many :users, through: :user_routines
  has_many :histories, dependent: :destroy
end
