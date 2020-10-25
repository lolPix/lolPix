class Comment < ApplicationRecord
  belongs_to :post
  belongs_to :user
  validates_presence_of :content, :post

  has_many :comment_reactions
  belongs_to :parent,  class_name: 'Comment', optional: true
  has_many   :replies, class_name: 'Comment', foreign_key: :parent_id, dependent: :destroy
end
