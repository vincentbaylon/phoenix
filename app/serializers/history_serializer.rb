class HistorySerializer < ActiveModel::Serializer
  attributes :id, :in_progress, :routine_id, :workout_id, :date, :user_id, :show_trackers

  belongs_to :user
  belongs_to :routine
  belongs_to :workout

  has_many :trackers

  def show_trackers
    self.object.trackers
  end
end
