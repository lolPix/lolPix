# frozen_string_literal: true

# Model for report comments.
class ReportComment < ApplicationRecord
  belongs_to :report
  belongs_to :user

  validates_presence_of :content
  validates_presence_of :user
  validates_presence_of :report

  scope :of_report, ->(report) { where('report_id = ?', report.id) }
  scope :of_user, ->(user) { where('user_id = ?', user.id) }
end
