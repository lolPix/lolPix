class ApplicationController < ActionController::Base
  before_action :authorized, only: %i[authorized auth_header decoded_token logged_in_user logged_in?]
  before_action :logged_in_user, only: %i[index post login profile logout]
  helper_method :get_post, :get_profile, :delete_session

  def encode_token
    Rails.logger.info "Starting token encoding for user #{@user.username}"
    if @user.jwts.nil?
      Rails.logger.info "Generating new key for user #{@user.username}"
      @user.jwts = SecureRandom.alphanumeric(28)
      Rails.logger.info "Saving key for user #{@user.username}"
      @user.save
    end
    Rails.logger.info "Encoding JWT for user #{@user.username}"
    JWT.encode({ id: @user.id }, @user.jwts)
  end

  def auth_header
    # { Authorization: 'Bearer <token>' }
    request.headers['Authorization']
  end

  def decoded_token
    return unless auth_header

    token = auth_header.split(' ')[1]
    # header: { 'Authorization': 'Bearer <token>' }
    begin
      Rails.logger.info "Token: '#{token}'"
      parsed_userid = get_userid_from_jwt(token)
      if User.exists?(id: parsed_userid)
        user = User.find_by(id: parsed_userid)
        Rails.logger.info "JWTS: '#{user.jwts}'"

        decoded = JWT.decode(token, user.jwts, true, algorithm: 'HS256')
        add_cookie_to_response(token) if decoded
        Rails.logger.info "Decoded: #{decoded}"
        return decoded
      end

      nil
    rescue JWT::DecodeError
      nil
    end
  end

  def decoded_cookie
    return nil unless cookies[:lolpix_jwt]

    user_id_from_jwt = get_userid_from_jwt(cookies[:lolpix_jwt])
    @user = User.find_by(id: user_id_from_jwt)
    JWT.decode(cookies[:lolpix_jwt], @user.jwts, true, algorithm: 'HS256')
  rescue JWT::DecodeError
    nil
  end

  def logged_in_user
    if decoded_token
      user_id = decoded_token[0]['id']
      @user = User.find_by(id: user_id)
      Rails.logger.info "user: #{@user.as_json}"
      @user
    else
      Rails.logger.info 'no token found, trying cookie!'
      parse_user_from_cookie
    end
  end

  def parse_user_from_cookie
    the_decoded_cookie = decoded_cookie
    if the_decoded_cookie
      user_id = the_decoded_cookie[0]['id']
      Rails.logger.info "Found userid #{user_id}"
      @user = User.find_by(id: user_id)
      Rails.logger.info "Found user #{@user.username}"
      redirect_to('/') && return if request.fullpath == '/login'

      @user
    else
      redirect_to('/login') && return unless request_path_unauthenticated

      nil
    end
  end

  def logged_in?
    !!logged_in_user
  end

  def authorized
    render json: {message: I18n.t('error.unauthorized')}, status: :unauthorized unless logged_in?
  end

  def index; end

  def post; end

  def profile; end

  def login; end

  def join; end

  def logout; end

  def get_post
    Post.find(params[:postId])
  end

  def get_profile
    User.find_by_username(params[:username])
  end

  def delete_session
    if cookies.key?(:lolpix_jwt)
      userid_from_jwt = get_userid_from_jwt(cookies[:lolpix_jwt])
      user = nil
      if User.exists?(id: userid_from_jwt)
        user = User.find(userid_from_jwt)
      elsif !@user.nil?
        user = @user
      end
      unless user.nil?
        user.jwts = nil
        user.save
      end
    end
    reset_session
    cookies.delete :lolpix_jwt, domain: :all
    nil
  end

  def request_path_unauthenticated
    request.fullpath == '/login' ||
      request.fullpath.start_with?('/api') ||
      request.fullpath == '/logout' ||
      request.fullpath == '/join'
  end

  def get_jwts_from_user(token)
    user_id_from_jwt = get_userid_from_jwt(token).to_i
    user = User.find_by(id: user_id_from_jwt)
    if !user
      nil
    else
      user.jwts
    end
  end

  def add_cookie_to_response(token)
    response.set_cookie(
      :lolpix_jwt,
      {
        value: token,
        expires: 10.years.from_now,
        path: '/',
        secure: Rails.env.production?,
        httponly: true
      }
    )
  end

  def get_userid_from_jwt(token)
    return nil if token.nil?

    payload_section = token.split('.')[1]
    decoded_payload = JWT::Base64.url_decode(payload_section)
    Rails.logger.info "Payload: '#{decoded_payload}'"
    parsed_json = JWT::JSON.parse(decoded_payload)
    Rails.logger.info "Parsed JSON: '#{parsed_json}'"
    Rails.logger.info "Parsed ID: '#{parsed_json['id']}'"
    parsed_json['id']
  end
end
