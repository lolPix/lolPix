class CommentReaction < ApplicationRecord
  belongs_to :comment
  belongs_to :user

  validates_presence_of :comment, :user
  validates_uniqueness_of :comment_id, scope: %i[user_id]

  scope :of_comment, ->(comment) { where('comment_id == ?', comment.id) }
  scope :of_user, ->(user) { where('user_id == ?', user.id) }

  def as_json(options = {})
    confidential_fields = %i[created_at updated_at]
    super(options.merge({except: confidential_fields}))
  end
end
