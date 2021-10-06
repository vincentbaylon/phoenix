class CreateTrackers < ActiveRecord::Migration[6.1]
  def change
    create_table :trackers do |t|
      t.belongs_to :exercise, null: false, foreign_key: true
      t.belongs_to :history, null: false, foreign_key: true
      t.string :date
      t.string :set
      t.integer :reps
      t.integer :weight

      t.timestamps
    end
  end
end
