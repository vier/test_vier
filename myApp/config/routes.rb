MyApp::Application.routes.draw do
 
  ## Root
  root :to => 'home#index'

  ## Match
  match "/home" => 'home#index'
  match "/home/index" => 'home#index'
  match "/home/api" => 'home#api'

  ## Resource
  # resources :home, :only => [:index]

  ## Legacy Route (Not recommended)
  #match ':controller(/:action)'

end
