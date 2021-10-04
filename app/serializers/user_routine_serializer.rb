class UserRoutineSerializer < ActiveModel::Serializer
  attributes :id, :days, :day_complete, :current, :current_routine
  has_one :user
  has_one :routine

  def current_routine
    if self.object.current == true
      self.object.routine
    else

    end
  end
end
