class AppJwtsToUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :jwtsecret, :string
  end
end
