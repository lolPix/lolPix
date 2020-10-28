class ApplicationController < ActionController::Base
  before_action :authorized, only: %i[authorized auth_header decoded_token logged_in_user logged_in?]

  def encode_token(payload)
    JWT.encode(payload, Rails.application.credentials.secret_key_base,)
  end

  def auth_header
    # { Authorization: 'Bearer <token>' }
    request.headers['Authorization']
  end

  def decoded_token
    if auth_header
      token = auth_header.split(' ')[1]
      # header: { 'Authorization': 'Bearer <token>' }
      begin
        JWT.decode(token, Rails.application.credentials.secret_key_base, true, algorithm: 'HS256')
      rescue JWT::DecodeError
        nil
      end
    end
  end

  def logged_in_user
    if decoded_token
      user_id = decoded_token[0]['user_id']
      @user = User.find_by(id: user_id)
    end
  end

  def logged_in?
    !!logged_in_user
  end

  def authorized
    render json: { message: I18n.t('error.unauthorized') }, status: :unauthorized unless logged_in?
  end

  def index; end
end
