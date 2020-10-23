class MakeUserPropertiesUnique < ActiveRecord::Migration[6.0]
  def change
    add_index :users, %i[username email], unique: true
  end
end
