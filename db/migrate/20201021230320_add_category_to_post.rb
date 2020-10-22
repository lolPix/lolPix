class AddCategoryToPost < ActiveRecord::Migration[6.0]
  def change
    add_column :posts, :category, :integer
  end
end
