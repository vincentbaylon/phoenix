class TrackerSerializer < ActiveModel::Serializer
  attributes :id, :date, :set, :reps, :weight

  has_one :exercise
  has_one :history
end
