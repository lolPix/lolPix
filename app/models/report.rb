# frozen_string_literal: true

# Model for Reports.
class Report < ApplicationRecord
  belongs_to :user
  belongs_to :post

  has_many :report_comments

  validates_presence_of :user, :post, :description

  scope :of_post, ->(post) { where('post_id == ?', post.id) }
  scope :of_user, ->(user) { where('user_id == ?', user.id) }

  def serializable_hash(options = nil)
    options = {} if options.nil?
    ActiveStorage::Current.set(host: LolPix::Application.get_host_value) do
      confidential_fields = %i[report_comments]
      enriched_values = {
        comments: ReportComment.find(report_comment_ids)
      }
      super(options.merge({ except: confidential_fields })).merge(enriched_values)
    end
  end
end
