class CreateProgresses < ActiveRecord::Migration[6.1]
  def change
    create_table :progresses do |t|
      t.boolean :checkedIn
      t.date :checkInFrequency
      t.string :checkInDay

      t.timestamps
    end
  end
end
