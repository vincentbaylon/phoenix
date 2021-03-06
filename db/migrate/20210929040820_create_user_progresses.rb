class CreateUserProgresses < ActiveRecord::Migration[6.1]
  def change
    create_table :user_progresses do |t|
      t.integer :weight
      t.string :image_url, default: ''
      t.string :date
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
