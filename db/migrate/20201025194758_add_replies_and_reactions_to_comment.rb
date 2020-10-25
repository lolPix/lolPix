class AddRepliesAndReactionsToComment < ActiveRecord::Migration[6.0]
  def change
    create_table :comment_reactions do |t|
      t.references :comment, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.boolean :positive

      t.timestamps
    end
    add_column :comments, :parent_id, :integer
  end
end
