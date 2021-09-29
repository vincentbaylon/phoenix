class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :username, :email, :password_digest

  has_many :user_routines
  has_many :routines, through: :user_routines
  has_many :user_progresses
  has_many :progresses, through: :user_progresses
end
