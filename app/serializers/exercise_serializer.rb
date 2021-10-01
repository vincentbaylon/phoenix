class ExerciseSerializer < ActiveModel::Serializer
  attributes :id, :name, :weight, :bodypart, :region

  has_many :workout_exercises
  has_many :workouts
end
