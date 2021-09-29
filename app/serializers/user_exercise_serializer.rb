class UserExerciseSerializer < ActiveModel::Serializer
  attributes :id, :weight
  has_one :user
  has_one :exercise
end
