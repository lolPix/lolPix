class AuthController < ApplicationController
  protect_from_forgery unless: -> { true }
  before_action :authorized, only: [:auto_login]

  # REGISTER
  def register
    @user = User.create(user_params)
    if @user.valid?
      token = encode_token({user_id: @user.id})
      render json: {user: @user, token: token}
    else
      render json: {error: I18n.t('error.user_invalid'), detail: @user.errors}
    end
  end

  # LOGGING IN
  def login
    @user = User.find_by(email: params[:email])

    if @user && @user.authenticate(params[:password])
      token = encode_token({user_id: @user.id})
      render json: {user: @user, token: token}
    else
      render json: {error: I18n.t('error.login_error')}
    end
  end

  def auto_login
    render json: @user
  end

  private

  def user_params
    params.permit(:username, :password, :bio, :email, :image)
  end

end
