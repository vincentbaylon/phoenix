class CreateExercises < ActiveRecord::Migration[6.1]
  def change
    create_table :exercises do |t|
      t.string :name
      t.string :weight
      t.string :bodypart
      t.string :region

      t.timestamps
    end
  end
end
