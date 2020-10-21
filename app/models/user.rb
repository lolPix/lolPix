class User < ApplicationRecord
  validates_presence_of :username, :bio, :email
  validates_length_of :username, :minimum => 5
  validates_length_of :bio, :minimum => 15

  has_many :comments
  has_many :posts

  has_secure_password

  def as_json(options = {})
    super(options.merge({ except: %i[email password_digest created_at updated_at posts_id comments_id id] }))
  end
end
