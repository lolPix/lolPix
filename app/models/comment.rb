class Comment < ApplicationRecord
  belongs_to :post
  belongs_to :user
  validates_presence_of :content, :post

  has_many :comment_reactions
  belongs_to :parent, class_name: 'Comment', optional: true
  has_many :replies, class_name: 'Comment', foreign_key: :parent_id, dependent: :destroy

  def as_json(options = {})
    ActiveStorage::Current.set(host: LolPix::Application.get_host_value) do
      confidential_fields = %i[updated_at user_id comment_reaction_ids]
      enriched_values = {
          user: User.find(user_id),
          reactions: CommentReaction.find(comment_reaction_ids)
      }
      super(options.merge({except: confidential_fields})).merge(enriched_values)
    end
  end
end
