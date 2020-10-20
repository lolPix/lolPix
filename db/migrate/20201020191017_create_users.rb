class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.references :posts, index: true
      t.references :comments, index: true
      t.string :username
      t.text :bio
      t.string :email
      t.string :password_digest

      t.timestamps
    end
  end
end
