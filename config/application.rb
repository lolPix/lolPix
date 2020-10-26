require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)


module LolPix
  # main app class I guess...
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.0

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.

    # Set host and port once and for all
    LolPix::Application.default_url_options = {host: ENV['LOLPIX_HOST'], port: ENV['LOLPIX_HOST']}
    Rails.application.config.action_mailer.default_url_options = {host: ENV['LOLPIX_HOST'], port: ENV['LOLPIX_HOST']}
    config.action_controller.default_url_options = {host: ENV['LOLPIX_HOST'], port: ENV['LOLPIX_HOST']}
    Rails.application.routes.default_url_options[:host] = ENV['LOLPIX_HOST']
    Rails.application.routes.default_url_options[:port] = ENV['LOLPIX_PORT']

    def get_host_value
      host_value = ''
      host_value << ENV['LOLPIX_HOST']
      host_value << ':'
      host_value << ENV['LOLPIX_PORT']
      host_value
    end
  end
end
