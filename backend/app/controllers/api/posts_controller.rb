require 'httparty'

class Api::PostsController < ApplicationController
    def generate_image
        description = params[:post]
        # render json: { image_url: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg' }
        response = dalle_api(description)

        if (response.code == 200)
            render json: { image_url: response['data']['url'] }
        else
            render json: { error: 'Failed to retrieve image.' }
        end
    end
end

private
def dalle_api(description)
    api_key = ENV['DALLE_API_KEY']
    url = 'https://api.openai.com/v1/images/generations'

    headers = {
        'Authorization' => "Bearer #{api_key}",
        'Content-Type' => 'application/json'
    }

    body = {
        prompt: description,
        n: 1,
        size: '1024x1024'
    }.to_json

    HTTParty.post(url, body: body, headers: headers)
end
