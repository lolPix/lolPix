class User < ApplicationRecord
  validates_presence_of :username, :displayName, :email
  validates_length_of :username, :minimum => 5
  validates_length_of :displayName, :minimum => 5

  has_many :comments
  has_many :posts
end
