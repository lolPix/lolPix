class Post < ApplicationRecord
  before_create :generate_random_id

  validates_presence_of :content, :title
  validates_length_of :title, minimum: 5

  has_many :comments
  belongs_to :user

  private

  def generate_random_id
    self.postId = SecureRandom.uuid

    validates_presence_of :postId
  end
end
