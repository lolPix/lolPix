Rails.application.routes.draw do

  namespace :api, :defaults => { :format => 'json' } do
    namespace :v1 do
      resources :posts
      resources :comments
    end
  end

  post '/login', to: 'auth#login'
  post '/register', to: 'auth#register'
  get '/auto_login', to: 'auth#auto_login'

  root to: 'application#index'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
