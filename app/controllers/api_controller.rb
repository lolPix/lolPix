class ApiController < ActionController::API
  include ActionController::Cookies
  include ActiveModel::Serializers::JSON

  before_action :authorized, only: %i[authorized auth_header decoded_token logged_in_user logged_in?]
  before_action :set_cache_headers

  def set_cache_headers
    response.headers["Cache-Control"] = "no-cache, no-store"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "Mon, 01 Jan 1990 00:00:00 GMT"
  end

  def encode_token
    if @user.jwts.nil?
      @user.jwts = SecureRandom.alphanumeric(28)
      @user.save
    end
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
      parsed_userid = get_userid_from_jwt(token)
      if User.exists?(id: parsed_userid)
        user = User.find_by(id: parsed_userid)

        decoded = JWT.decode(token, user.jwts, true, algorithm: 'HS256')
        add_cookie_to_response(token) if decoded
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
      Rails.logger.info "Logged in: #{@user.username}"
      @user
    else
      Rails.logger.info 'No token found, trying cookie...'
      parse_user_from_cookie
    end
  end

  def parse_user_from_cookie
    the_decoded_cookie = decoded_cookie
    if the_decoded_cookie
      @user = User.find_by(id: the_decoded_cookie[0]['id'])
      Rails.logger.info "Logged in: #{@user.username}"
      redirect_to('/') && return if request.fullpath == '/login'

      @user
    else
      head :unauthorized, location: '/login'

      nil
    end
  end

  def logged_in?
    !!logged_in_user
  end

  def authorized
    render json: { message: I18n.t('error.unauthorized') }, status: :unauthorized unless logged_in?
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
    parsed_json = JWT::JSON.parse(decoded_payload)
    parsed_json['id']
  end
end
