class CreateRoutineWorkouts < ActiveRecord::Migration[6.1]
  def change
    create_table :routine_workouts do |t|
      t.string :day, array: true
      t.boolean :day_complete
      t.belongs_to :routine, null: false, foreign_key: true
      t.belongs_to :workout, null: false, foreign_key: true

      t.timestamps
    end
  end
end
