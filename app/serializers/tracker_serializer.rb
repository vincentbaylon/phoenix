class TrackerSerializer < ActiveModel::Serializer
  attributes :id, :date, :set, :reps, :weight, :show_exercise

  has_one :exercise
  has_one :history

  def show_exercise
    self.object.exercise
  end
end
