class User < ApplicationRecord
  validates_presence_of :username, :bio, :email
  validates_length_of :username, :minimum => 5
  validates_length_of :bio, :minimum => 15

  has_many :comments
  has_many :posts

  has_secure_password
end
