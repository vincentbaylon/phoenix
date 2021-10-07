class User < ApplicationRecord
  has_secure_password

  validates :username, :password_digest, :name, :email, presence: :true
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
  has_many :histories, dependent: :destroy

  def generate_password_token!
    self.reset_password_token = generate_token
    self.reset_password_sent_at = Time.now.utc
    save!
  end
   
  def password_token_valid?
    (self.reset_password_sent_at + 1.hours) > Time.now.utc
  end
   
  def reset_password!(password)
    self.reset_password_token = nil
    self.password = password
    save!
  end
   
  private
   
  def generate_token
    SecureRandom.hex(10)
  end
end
