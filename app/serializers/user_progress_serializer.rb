class UserProgressSerializer < ActiveModel::Serializer
  attributes :id, :weight, :image_url, :date, :user_id, :progress_id

  has_one :user
  has_one :progress
end
