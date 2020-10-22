class RemoveContentFromPost < ActiveRecord::Migration[6.0]
  def change
    remove_column :posts, :content
  end
end
