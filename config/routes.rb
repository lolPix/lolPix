Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      resources :posts
      resources :comments
      resources :reactions
      resources :comment_reactions
      resources :users, only: [:show]
    end
  end

  post '/api/v1/login', to: 'auth#login_api'
  post '/api/v1/register', to: 'auth#register'
  get '/api/v1/hi', to: 'auth#auto_login'

  get '/post/:postId', to: 'application#post'
  get '/login', to: 'application#login'

  #get '*all' => 'application#index', constraints: lambda { |req|
  #  req.path.exclude? 'rails/active_storage'
  #}

  root to: 'application#index'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
