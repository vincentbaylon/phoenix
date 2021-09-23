class CreateRoutines < ActiveRecord::Migration[6.1]
  def change
    create_table :routines do |t|
      t.string :name
      t.integer :days
      t.datetime :schedule
      t.boolean :dayComplete
      t.date :duration

      t.timestamps
    end
  end
end
