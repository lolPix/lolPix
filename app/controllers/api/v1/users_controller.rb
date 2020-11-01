# frozen_string_literal: true

module Api
  module V1
    # A controller for users
    class UsersController < ApiController
      before_action :logged_in_user
      # GET /users/<username>
      def show
        @user = User.find_by_username(params[:id])
        render json: @user
      end
    end
  end
end
