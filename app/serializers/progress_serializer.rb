class ProgressSerializer < ActiveModel::Serializer
  attributes :id, :checkedIn, :checkInFrequency, :checkInDay
  
  has_many :user_progresses
  has_many :users, through: :user_progresses
end
