Rails.application.routes.draw do
  resources :adds, only: [:create, :destroy]
  resources :lists, only: [:index, :show, :create, :destroy]
  resources :movies, only: [:index, :create, :show]


  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
