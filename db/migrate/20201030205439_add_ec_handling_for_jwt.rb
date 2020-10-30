class AddEcHandlingForJwt < ActiveRecord::Migration[6.0]
  def change
    remove_column :users, :jwtsecret

    create_table :jwt_keys do |t|
      t.string :privkey
      t.string :pubkey
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
