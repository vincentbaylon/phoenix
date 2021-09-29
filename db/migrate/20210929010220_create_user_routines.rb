class CreateUserRoutines < ActiveRecord::Migration[6.1]
  def change
    create_table :user_routines do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :routine, null: false, foreign_key: true
      t.string :days, array: true
      t.boolean :day_complete

      t.timestamps
    end
  end
end
