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

  def as_json(options = {})
    ActiveStorage::Current.set(host: LolPix::Application.get_host_value) do
      confidential_fields = %i[email image password_digest created_at updated_at posts_id comments_id]
      generated_json = super(options.merge({except: confidential_fields}))
      if image
        generated_json.merge({image: url_for(image)})
      else
        generated_json
      end
    end
  end
end
