Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :posts
      resources :comments
      resources :reactions
      resources :reports
      resources :comment_reactions
      resources :users, only: [:show]
    end
  end

  post '/api/v1/login', to: 'auth#login_api'
  post '/api/v1/register', to: 'auth#register'
  get '/api/v1/hi', to: 'auth#auto_login'

  get '/admin', to: 'admin#index'
  get '/admin/reports', to: 'admin#reports'
  get '/admin/report/:reportId', to: 'admin#report'

  get '/post/:postId', to: 'application#post'
  get '/new', to: 'application#new_post'
  get '/report/:postId', to: 'application#report'
  get '/user/:username', to: 'application#profile'
  get '/login', to: 'application#login'
  get '/join', to: 'application#join'

  get '/logout', to: 'application#logout'

  get '/top', to: 'feed#top'
  get '/newest', to: 'feed#new'
  get '/memes', to: 'feed#memes'
  get '/fails', to: 'feed#fails'
  get '/gifs', to: 'feed#gifs'

  # get '*all' => 'application#index', constraints: lambda { |req|
  #  req.path.exclude? 'rails/active_storage'
  # }

  root to: 'application#index'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
