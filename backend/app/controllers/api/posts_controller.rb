require 'httparty'
require 'openai'

class Api::PostsController < ApplicationController
    def generate_image

        description = params[:post]
        gpt_response = gpt_api("I am creating an exciting avatar based on the given biography of a person.
                                The biography is below; take the biography and create bullet points based on it so that another AI model can create
                                an awesome avatar by using your bullet points. But create the bullet points in such a way that it can be artistically displayed.
                                #{description}")
        puts "Successfully generated bullet points..."
        response_body = JSON.parse(gpt_response.body)
        dalle_input = response_body["choices"][0]["message"]["content"]
        puts "Retrieving image from DALL-E..."
        response = dalle_api("#{dalle_input}")
        render json: { image_url: response['data'][0]['url'] }
        puts "Successfully retrieved image from DALL-E!"
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

def gpt_api(description)
    api_key = ENV['DALLE_API_KEY']
    url = "https://api.openai.com/v1/chat/completions"

    headers = {
        "Authorization" => "Bearer #{api_key}",
        "Content-Type" => "application/json"
    }

    body = {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: description }]
    }.to_json

    HTTParty.post(url, body: body, headers: headers)
end
