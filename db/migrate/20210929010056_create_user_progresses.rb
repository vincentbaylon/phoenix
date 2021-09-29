class CreateUserProgresses < ActiveRecord::Migration[6.1]
  def change
    create_table :user_progresses do |t|
      t.belongs_to :progress, null: false, foreign_key: true
      t.belongs_to :user, null: false, foreign_key: true
      t.integer :weight
      t.string :image_url

      t.timestamps
    end
  end
end
