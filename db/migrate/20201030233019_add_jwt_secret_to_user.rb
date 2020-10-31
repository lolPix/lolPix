# frozen_string_literal: true

# Migration that adds a new field to the users column.
class AddJwtSecretToUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :jwts, :string
  end
end
