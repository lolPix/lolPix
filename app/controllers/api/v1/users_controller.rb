# frozen_string_literal: true

module Api
  module V1
    # A controller for users
    class UsersController < ActionController::API
      # GET /users/<username>
      def show
        @user = User.find_by_username(params[:id])
        render json: @user
      end

    end
  end
end
