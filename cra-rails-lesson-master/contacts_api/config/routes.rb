Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get '/people', to: 'people#index'
  get '/people/:id', to: 'people#show'
  post '/people', to: 'people#create'
  delete '/people/:id', to: 'people#delete'
  put '/people/:id', to: 'people#update'
end
