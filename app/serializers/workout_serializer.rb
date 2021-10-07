class WorkoutSerializer < ActiveModel::Serializer
  attributes :id, :name, :workout_exercises, :workout_days

  has_many :routine_workouts
  has_many :routines, through: :routine_workouts
  has_many :workout_exercises
  has_many :exercises, through: :workout_exercises

  def workout_exercises
    self.object.exercises
  end

  def workout_days
    self.object.routine_workouts
  end
end
