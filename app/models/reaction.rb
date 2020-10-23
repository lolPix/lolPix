class Reaction < ApplicationRecord
  belongs_to :post
  belongs_to :user

  validates_presence_of :post, :user
  validates_uniqueness_of :post_id, scope: %i[user_id]

  def as_json(options = {})
    confidential_fields = %i[created_at updated_at]
    super(options.merge({except: confidential_fields}))
  end
end
