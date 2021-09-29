class CreateUserRoutines < ActiveRecord::Migration[6.1]
  def change
    create_table :user_routines do |t|
      t.boolean :day_complete
      t.boolean :current
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :routine, null: false, foreign_key: true

      t.timestamps
    end
  end
end
