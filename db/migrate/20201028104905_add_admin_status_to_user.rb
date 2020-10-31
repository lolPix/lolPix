# frozen_string_literal: true

# Migration that adds the admin field to the user class.
class AddAdminStatusToUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :admin, :boolean
  end
end
