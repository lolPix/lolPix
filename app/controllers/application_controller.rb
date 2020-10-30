class ApplicationController < ActionController::Base
  require 'rbnacl'

  before_action :authorized, only: %i[authorized auth_header decoded_token logged_in_user logged_in?]
  before_action :logged_in_user, only: %i[index post login profile logout]
  helper_method :get_post, :get_profile, :delete_session

  def encode_token
    unless @user.jwtsecret
      ecdsa_key = OpenSSL::PKey::EC.new 'prime256v1'
      ecdsa_key.generate_key
      ecdsa_public = OpenSSL::PKey::EC.new ecdsa_key
      ecdsa_public.private_key = nil
      # TODO: save keys and stuff
      @user.save
    end
    JWT.encode(@user.id, @user.jwtsecret, algorithm: 'ES512')
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
      jwts_from_user = get_jwts_from_user(token)
      Rails.logger.info "JWTS: '#{jwts_from_user}'"

      decoded = JWT.decode(token, jwts_from_user, true, algorithm: 'ES512')
      set_cookie(token) if decoded
      Rails.logger.info "Decoded: #{decoded}"
      decoded
    rescue JWT::DecodeError
      nil
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
      @user
    else
      Rails.logger.info 'no token found, trying cookie!'
      the_decoded_cookie = decoded_cookie
      Rails.logger.info "cookie: #{the_decoded_cookie}"
      if the_decoded_cookie
        user_id = the_decoded_cookie[0]['user_id']
        @user = User.find_by(id: user_id)
        redirect_to('/') && return if request.fullpath == '/login'

        @user
      else
        Rails.logger.info 'no cookie found!'
        unless request.fullpath == '/login' ||
               request.fullpath.start_with?('/api') ||
               request.fullpath == '/logout' ||
               request.fullpath == '/join'
          redirect_to('/login') &&
            return
        end

        nil
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
        user.jwtsecret = nil
        user.save
      end
    end
    reset_session
    cookies.delete :lolpix_jwt, domain: :all
    nil
  end

  private

  def get_jwts_from_user(token)
    user_id_from_jwt = get_userid_from_jwt(token).to_i
    user = User.find_by(id: user_id_from_jwt)
    if !user
      nil
    else
      user.jwtsecret
    end
  end

  def set_cookie(token)
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
    JWT::JSON.parse(decoded_payload).to_s.to_i
  end
end
