class WorkoutSerializer < ActiveModel::Serializer
  attributes :id, :name, :workouts_exercises

  has_many :routine_workouts
  has_many :routines, through: :routine_workouts
  has_many :workout_exercises
  has_many :exercises

  def workouts_exercises
    self.object.exercises
  end
end
