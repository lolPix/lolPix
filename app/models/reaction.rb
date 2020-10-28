class Reaction < ApplicationRecord
  belongs_to :post
  belongs_to :user

  validates_presence_of :post, :user
  validates_uniqueness_of :post_id, scope: %i[user_id]

  scope :of_post, ->(post) { where('post_id == ?', post.id) }
  scope :of_user, ->(user) { where('user_id == ?', user.id) }

  def serializable_hash(options = nil)
    options = {} if options.nil?
    confidential_fields = %i[created_at updated_at]
    super(options.merge({except: confidential_fields}))
  end
end
