class AddJwtSecretToUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :jwts, :string
  end
end
