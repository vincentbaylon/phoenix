class TrackerSerializer < ActiveModel::Serializer
  attributes :id, :date, :set, :reps, :weight
  has_one :exercise
end
