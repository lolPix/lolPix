Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      resources :posts
      resources :comments
      resources :reactions
    end
  end

  post '/api/v1/login', to: 'auth#login'
  post '/api/v1/register', to: 'auth#register'
  get '/api/v1/hi', to: 'auth#auto_login'

  get '*all' => 'application#index', constraints: lambda { |req|
    req.path.exclude? 'rails/active_storage'
  }

  root to: 'application#index'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
