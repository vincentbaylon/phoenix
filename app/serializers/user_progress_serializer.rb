class UserProgressSerializer < ActiveModel::Serializer
  attributes :id, :weight, :image_url, :date, :user_id, :progress_id
end
