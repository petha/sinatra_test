class RestApplication < Sinatra::Base
  configure do
    # Don't log them. We'll do that ourself
    set :dump_errors, false

    # Don't capture any errors. Throw them up the stack
    set :raise_errors, true

    # Disable internal middleware for presenting errors
    # as useful HTML pages
    set :show_exceptions, false
  end

  helpers do
    def parsed_body
      ::MultiJson.decode(request.body)
    end
  end

  get %r{^/$|(^/posts.*)}  do
    send_file File.expand_path('index.html', settings.public_folder)
  end

  get "/api/posts" do
    content_type :json
    Post.all.to_json
  end

  post "/api/posts" do
    content_type :json
    Post.create(parsed_body.select_keys('name', 'body')).to_json
  end

  put '/api/posts/:post_id' do
    content_type :json
    Post.update(params[:post_id], parsed_body.select_keys('name', 'body')).to_json
  end

  get '/api/posts/:post_id' do
    content_type :json
    Post.find(params[:post_id]).to_json
  end

  delete '/api/posts/:post_id' do
    Post.find(params[:post_id]).destroy()
  end

  private

end