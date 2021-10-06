class RoutineSerializer < ActiveModel::Serializer
  attributes :id, :name, :routine_workouts, :routine_days, :routine_exercises
  has_many :user_routines
  has_many :users, through: :user_routines

  has_many :routine_workouts
  has_many :workouts, through: :routine_workouts

  def routine_workouts
    self.object.workouts
  end

  def routine_days
    self.object.routine_workouts
  end

  def routine_exercises
    self.object.workouts.map(&:show_exercises)
  end
end
