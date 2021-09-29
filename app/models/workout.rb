class Workout < ApplicationRecord
  has_many :workout_exercises
  has_many :exercises, through: :workout_exercises
  has_many :routine_workouts
  has_many :routines, through: :routine_workouts
  has_many :user_workouts
  has_many :users, through: :user_workouts
end
