class AdminController < ApplicationController
  before_action :logged_in_user, only: %i[index]

  def index; end
end
