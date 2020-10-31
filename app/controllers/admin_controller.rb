# frozen_string_literal: true

# Controller for admin stuff...
class AdminController < ApplicationController
  before_action :logged_in_user, only: %i[index reports report]
  before_action :ensure_admin, only: %i[index reports report]
  before_action :find_report_for_id_param, only: %i[report]
  helper_method :find_reports, :find_user_for_report, :find_post_for_report

  def index; end

  def reports; end

  def report; end

  def find_reports
    Report.all
  end

  def ensure_admin
    if @user.nil?
      head :unauthorized, location: '/'
    elsif !@user.admin
      head :forbidden, location: '/'
    end
  end

  def find_user_for_report(report)
    User.find_by(id: report.user_id)
  end

  def find_post_for_report(report)
    Post.find_by(id: report.post_id)
  end

  def find_report_for_id_param
    @report = Report.find_by(id: params[:reportId]) if params.key?(:reportId)
  end
end
