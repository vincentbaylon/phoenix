class AddDaysToUserRoutine < ActiveRecord::Migration[6.1]
  def change
    add_column :user_routines, :days, :string, array: true, default: []
  end
end
