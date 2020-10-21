class User < ApplicationRecord
  validates_presence_of :username, :bio, :email
  validates_length_of :username, minimum: 5
  validates_length_of :bio, minimum: 15

  has_many :comments
  has_many :posts

  has_one_attached :image

  has_secure_password

  def as_json(options = {})
    confidential_fields = %i[email image password_digest created_at updated_at posts_id comments_id id]
    super(options.merge({except: confidential_fields}))
  end
end
