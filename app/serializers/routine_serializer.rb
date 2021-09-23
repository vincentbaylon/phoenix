class RoutineSerializer < ActiveModel::Serializer
  attributes :id, :name, :days, :schedule, :dayComplete, :duration
end
