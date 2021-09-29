class CreateRoutineWorkouts < ActiveRecord::Migration[6.1]
  def change
    create_table :routine_workouts do |t|
      t.belongs_to :routine, null: false, foreign_key: true
      t.belongs_to :workout, null: false, foreign_key: true
      t.string :day
      t.boolean :day_complete

      t.timestamps
    end
  end
end
