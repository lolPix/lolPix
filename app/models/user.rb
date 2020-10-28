# frozen_string_literal: true

# Class representing a user record.
class User < ApplicationRecord
  include ActionView::Helpers
  include ActionDispatch::Routing
  include Rails.application.routes.url_helpers

  validates_presence_of :username, :bio, :email
  validates_length_of :username, minimum: 5
  validates_length_of :bio, minimum: 15

  has_many :comments
  has_many :posts
  has_many :reactions

  has_one_attached :image

  has_secure_password

  def serializable_hash(options = nil)
    options = {} if options.nil?
    ActiveStorage::Current.set(host: LolPix::Application.get_host_value) do
      confidential_fields = %i[email image password_digest created_at updated_at posts_id comments_id]
      generated_stuff = super(options.merge({except: confidential_fields}))
      if image.attached?
        generated_stuff.merge({image: url_for(image)})
      else
        generated_stuff
      end
    end
  end
end
