class WorkoutSerializer < ActiveModel::Serializer
  attributes :id, :name

  has_many :routine_workouts
  has_many :routines, through: :routine_workouts
  has_many :workout_exercises
  has_many :exercises, through: :workout_exercises
end
