class Post < ApplicationRecord
  include ActionView::Helpers
  include ActionDispatch::Routing
  include Rails.application.routes.url_helpers

  before_create :generate_random_id

  validates_presence_of :title, :category, :user, :alt_text
  validates_length_of :title, minimum: 5
  validates_length_of :alt_text, minimum: 8
  validates_numericality_of :category

  has_many :comments
  has_many :reactions
  belongs_to :user

  has_one_attached :image

  def as_json(options = {})
    ActiveStorage::Current.set(host: LolPix::Application.get_host_value) do
      confidential_fields = %i[image updated_at user_id reaction_id]
      enriched_values = {
          image: url_for(image),
          user: User.find(user_id),
          reactions: Reaction.find(reaction_ids)
      }
      super(options.merge({except: confidential_fields})).merge(enriched_values)
    end
  end

  private

  def generate_random_id
    self.postId = SecureRandom.uuid

    validates_presence_of :postId
  end
end
