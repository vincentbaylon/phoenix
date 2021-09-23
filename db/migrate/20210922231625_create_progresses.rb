class CreateProgresses < ActiveRecord::Migration[6.1]
  def change
    create_table :progresses do |t|
      t.boolean :checkedIn
      t.date :checkInFrequency
      t.string :checkInDay
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
