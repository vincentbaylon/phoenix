class ProgressSerializer < ActiveModel::Serializer
  attributes :id, :checkedIn, :checkInFrequency, :checkInDay
  has_one :user
end
