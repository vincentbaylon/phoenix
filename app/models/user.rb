class User < ApplicationRecord
  has_secure_password

  validates :username, :password_digest, presence: :true
  validates :username, :email, uniqueness: true
  validates :password, length: { minimum: 6 }

  has_many :user_exercises, dependent: :destroy
  has_many :exercises, through: :user_exercises
  has_many :user_progresses, dependent: :destroy
  has_many :progresses, through: :user_progresses
  has_many :user_routines, dependent: :destroy
  has_many :routines, through: :user_routines
  has_many :user_workouts, dependent: :destroy
  has_many :workouts, through: :user_workouts
end
