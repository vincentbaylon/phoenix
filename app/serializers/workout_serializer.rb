class WorkoutSerializer < ActiveModel::Serializer
  attributes :id, :name, :workout_exercises

  has_many :routine_workouts
  has_many :routines, through: :routine_workouts
  has_many :workout_exercises
  has_many :exercises, through: :workout_exercises

  def workout_exercises
    self.object.exercises
  end
end
