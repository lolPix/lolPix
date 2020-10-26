class CreateBaseEntities < ActiveRecord::Migration[6.0]
  def change
    create_table :posts do |t|
      t.string :title
      t.string :postId
      t.string :content

      t.timestamps
    end

    create_table :users do |t|
      t.references :posts, index: true
      t.string :username
      t.text :bio
      t.string :email
      t.string :password_digest

      t.timestamps
    end

    create_table :comments do |t|
      t.text :content
      t.references :user, null: false, foreign_key: true
      t.references :post, null: false, foreign_key: true

      t.timestamps
    end
  end
end
