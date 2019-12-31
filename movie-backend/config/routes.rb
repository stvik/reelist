Rails.application.routes.draw do
  resources :adds
  resources :lists
  post '/movies/search', to: "movies#search"
  get '/movies/random', to: "movies#random"
  resources :movies


  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
