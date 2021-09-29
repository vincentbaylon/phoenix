class UserRoutineSerializer < ActiveModel::Serializer
  attributes :id, :days, :day_complete, :current
  has_one :user
  has_one :routine
end
