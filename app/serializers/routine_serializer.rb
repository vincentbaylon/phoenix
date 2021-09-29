class RoutineSerializer < ActiveModel::Serializer
  attributes :id, :name

  has_many :user_routines
  has_many :users, through: :user_routines

  has_many :routine_workouts
  has_many :workouts, through: :routine_workouts
end
