Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check
  post '/generate_image', to: 'api/posts#generate_image'
  
end
