class Post < ApplicationRecord
  include ActionView::Helpers
  include ActionDispatch::Routing
  include Rails.application.routes.url_helpers

  before_create :generate_random_id

  validates_presence_of :title, :category, :user
  validates_length_of :title, minimum: 5
  validates_numericality_of :category

  has_many :comments
  belongs_to :user

  has_one_attached :image

  def as_json(options = {})
    ActiveStorage::Current.set(host: LolPix::Application.get_host_value) do
      confidential_fields = %i[image updated_at]
      super(options.merge({except: confidential_fields})).merge({image: url_for(image)})
    end
  end

  private

  def generate_random_id
    self.postId = SecureRandom.uuid

    validates_presence_of :postId
  end
end
