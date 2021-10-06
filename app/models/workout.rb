class Workout < ApplicationRecord
  has_many :workout_exercises, dependent: :destroy
  has_many :exercises, through: :workout_exercises
  has_many :routine_workouts, dependent: :destroy
  has_many :routines, through: :routine_workouts
  has_many :user_workouts, dependent: :destroy
  has_many :users, through: :user_workouts

  def show_exercises
    self.exercises
  end
end
