Rails.application.routes.draw do
  
  resources :trackers
  resources :user_workouts
  resources :workout_exercises
  resources :user_routines
  resources :routine_workouts
  resources :user_progresses
  resources :user_exercises
  resources :workouts
  resources :progresses
  resources :routines
  resources :exercises
  resources :users

  get '/user_progresses/:id', to: 'user_progresses#show'
  get '/workouts/:id', to: 'workouts#show'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/me', to: 'users#show'

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
