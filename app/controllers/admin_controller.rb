class AdminController < ApplicationController
  before_action :logged_in_user, only: %i[index reports]
  helper_method :find_reports, :find_user_for_report, :find_post_for_report

  def index; end

  def reports; end

  def find_reports
    Report.all
  end

  def find_user_for_report(report)
    User.find_by(id: report.user_id)
  end

  def find_post_for_report(report)
    Post.find_by(id: report.post_id)
  end
end
