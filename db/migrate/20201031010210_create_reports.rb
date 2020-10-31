# frozen_string_literal: true

# Migration that adds reports.
class CreateReports < ActiveRecord::Migration[6.0]
  def change

    create_table :report_comments do |t|
      t.text :content
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end

    create_table :reports do |t|
      t.references :user, null: false, foreign_key: true
      t.references :post, null: false, foreign_key: true
      t.references :report_comments, index: true

      t.text :description
      t.boolean :resolved

      t.timestamps
    end

    add_reference :report_comments, :report, null: false, foreign_key: true
  end
end
