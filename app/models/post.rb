class Post < ApplicationRecord
  before_create :generate_random_id

  validates_presence_of :title, :category, :user
  validates_length_of :title, minimum: 5
  validates_numericality_of :category

  has_many :comments
  belongs_to :user

  has_one_attached :image

  private

  def generate_random_id
    self.postId = SecureRandom.uuid

    validates_presence_of :postId
  end
end
