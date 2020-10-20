class Comment < ApplicationRecord
  belongs_to :post, :user
  validates_presence_of :content, :post
end
