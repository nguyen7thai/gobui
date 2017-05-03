Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  #
  root 'bebes#index'
  resources :bebes
  get '/support' => 'statics#support'
  namespace :api do
    resources :users, only: [:create] do
      resources :activities, only: [:index] do
        member do
          post :go
        end
      end
    end
    resources :sessions, only: [:create]
    resources :activities, only: [] do
      member do
        post :accept
        post :deny
      end
    end
  end
end
