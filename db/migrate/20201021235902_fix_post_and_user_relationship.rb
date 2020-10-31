class FixPostAndUserRelationship < ActiveRecord::Migration[6.0]
  def change
    remove_index :users, name: 'index_users_on_posts_id'
    change_table :posts do |t|
      t.references :user, null: false, foreign_key: true
    end
  end
end
