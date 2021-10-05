class AddBelongsToTrackers < ActiveRecord::Migration[6.1]
  def change
    add_reference :trackers, :history, null: false, foreign_key: true
  end
end
