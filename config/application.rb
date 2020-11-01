require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

class Object; def ensure_array; [self] end end
class Array; def ensure_array; to_a end end
class NilClass; def ensure_array; to_a end end

module LolPix
  # main app class I guess...
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.0

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.

    # Settings for the pool of renderers:
    config.react.server_renderer_pool_size ||= 1 # ExecJS doesn't allow more than one on MRI
    config.react.server_renderer_timeout ||= 20 # seconds
    config.react.server_renderer = React::ServerRendering::BundleRenderer
    config.react.server_renderer_options = {
      files: ['server_rendering.js'], # files to load for prerendering
      replay_console: true # if true, console.* will be replayed client-side
    }
    # Changing files matching these dirs/exts will cause the server renderer to reload:
    config.react.server_renderer_extensions = %w[jsx js]
    config.react.server_renderer_directories = ['/app/assets/javascripts', '/app/javascript/']

    # Set host and port once and for all
    LolPix::Application.default_url_options = { host: ENV['LOLPIX_HOST'], port: ENV['LOLPIX_HOST'] }
    Rails.application.config.action_mailer.default_url_options = { host: ENV['LOLPIX_HOST'], port: ENV['LOLPIX_HOST'] }
    config.action_controller.default_url_options = { host: ENV['LOLPIX_HOST'], port: ENV['LOLPIX_HOST'] }
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
