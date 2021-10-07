class CreateHistories < ActiveRecord::Migration[6.1]
  def change
    create_table :histories do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :routine, null: false, foreign_key: true
      t.belongs_to :workout, null: false, foreign_key: true
      t.string :date
      t.boolean :in_progress, default: false

      t.timestamps
    end
  end
end
