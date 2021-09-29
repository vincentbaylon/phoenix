class RoutineWorkoutSerializer < ActiveModel::Serializer
  attributes :id, :day, :day_complete
  has_one :routine
  has_one :workout
end
