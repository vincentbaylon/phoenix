class ExerciseSerializer < ActiveModel::Serializer
  attributes :id, :name, :type, :bodypart, :region
end
