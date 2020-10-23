class AddAltTextToPost < ActiveRecord::Migration[6.0]
  def change
    add_column :posts, :alt_text, :text
  end
end
