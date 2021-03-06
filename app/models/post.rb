# frozen_string_literal: true

# Class representing a post record.
#
# Categories:
#   - 0: Memes
#   - 1: Fails
#   - 2: GIFs
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
  has_many :reports
  belongs_to :user

  has_one_attached :image

  scope :memes, -> { where(category: 0) }
  scope :fails, -> { where(category: 1) }
  scope :gifs, -> { where(category: 2) }
  scope :authored_by, ->(user) { where('posts.user_id = ?', user.id) }
  scope :newest_first, -> { order(created_at: :desc) }
  scope :oldest_first, -> { order(created_at: :desc) }
  scope :best_first, lambda {
    order('(CASE
              WHEN EXISTS(SELECT reactions.id
                          FROM reactions
                          WHERE reactions.post_id = posts.id) THEN
                  (SELECT sum(CASE
                                    WHEN reactions.positive THEN 1
                                    WHEN reactions.positive = false THEN -1 ELSE 0 END)
                   FROM reactions
                   WHERE reactions.post_id = posts.id)
              ELSE 0 END) DESC')
  }
  scope :worst_first, lambda {
    order('(CASE
              WHEN EXISTS(SELECT reactions.id
                          FROM reactions
                          WHERE reactions.post_id = posts.id) THEN
                  (SELECT sum(CASE
                                    WHEN reactions.positive THEN 1
                                    WHEN reactions.positive = false THEN -1 ELSE 0 END)
                   FROM reactions
                   WHERE reactions.post_id = posts.id)
              ELSE 0 END)')
  }

  def serializable_hash(options = nil)
    options = {} if options.nil?
    ActiveStorage::Current.set(host: LolPix::Application.get_host_value) do
      confidential_fields = %i[image updated_at user_id reaction_id comment_id]
      enriched_values = {
        image: url_for(image),
        user: User.find(user_id),
        reactions: Reaction.find(reaction_ids).map(&:as_json),
        top_level_comments: Comment.of_post(self).top_level_only
      }
      super(options.merge({ except: confidential_fields })).merge(enriched_values)
    end
  end

  private

  def generate_random_id
    self.postId = SecureRandom.uuid

    validates_presence_of :postId
  end
end
