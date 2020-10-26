class AddImageAndCommentsToUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :image, :string
    add_reference :users, :comments, index: true
  end
end
