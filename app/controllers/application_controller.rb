class ApplicationController < ActionController::Base
  before_action :authorized, only: %i[authorized auth_header decoded_token logged_in_user logged_in?]
  before_action :logged_in_user, only: :index

  def encode_token(payload)
    JWT.encode(payload, Rails.application.credentials.secret_key_base)
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

  def decoded_cookie
    begin
      JWT.decode(cookies[:lolpix_jwt], Rails.application.credentials.secret_key_base, true, algorithm: 'HS256')
    rescue JWT::DecodeError
      nil
    end
  end

  def logged_in_user
    if decoded_token
      user_id = decoded_token[0]['user_id']
      @user = User.find_by(id: user_id)
      Rails.logger.info "user: #{@user.as_json}"
    else
      Rails.logger.info 'no token found, trying cookie!'
      the_decoded_cookie = decoded_cookie
      Rails.logger.info "cookie: #{the_decoded_cookie}"
      if the_decoded_cookie
        user_id = the_decoded_cookie[0]['user_id']
        @user = User.find_by(id: user_id)
      else
        Rails.logger.info 'no cookie found!'
      end
    end
  end

  def logged_in?
    !!logged_in_user
  end

  def authorized
    render json: {message: I18n.t('error.unauthorized')}, status: :unauthorized unless logged_in?
  end

  def index; end
end
