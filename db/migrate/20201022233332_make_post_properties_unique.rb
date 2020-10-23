class MakePostPropertiesUnique < ActiveRecord::Migration[6.0]
  def change
    add_index :posts, %i[postId], unique: true
  end
end
