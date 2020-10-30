# JWT Key entity
class JWTKey < ApplicationRecord
  belongs_to :user

  validates_presence_of :privkey, :pubkey

  scope :of_user, ->(user) { where('user_id == ?', user.id) }

  def serializable_hash(options = nil)
    options = {} if options.nil?
    confidential_fields = %i[created_at updated_at privkey pubkey]
    super(options.merge({except: confidential_fields}))
  end
end
