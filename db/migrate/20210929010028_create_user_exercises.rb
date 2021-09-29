class CreateUserExercises < ActiveRecord::Migration[6.1]
  def change
    create_table :user_exercises do |t|
      t.integer :weight
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :exercise, null: false, foreign_key: true

      t.timestamps
    end
  end
end
