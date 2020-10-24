# frozen_string_literal: true

module Api
  module V1
    # A controller for posts.
    class PostsController < ActionController::API
      before_action :set_post, only: %i[show update destroy]

      # GET /posts
      # GET /posts.json
      def index
        if params.key?(:username)
          user = User.find_by_username(params[:username])
          return render head :no_content unless user

          posts = Post.authored_by(user)

        else
          posts = Post.all
        end

        paginate sort_posts(params, posts), per_page: 15
      end

      # GET /posts/1
      # GET /posts/1.json
      def show
        render json: @post
      end

      # POST /posts
      # POST /posts.json
      def create
        user = User.find_by_username(params[:username])
        @post = Post.new(post_params)
        @post.user = user

        if @post.save
          render json: @post, status: :created
        else
          render json: @post.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /posts/1
      # PATCH/PUT /posts/1.json
      def update
        if @post.update(post_params)
          render json: @post, status: :ok, location: @post
        else
          render json: @post.errors, status: :unprocessable_entity
        end
      end

      # DELETE /posts/1
      # DELETE /posts/1.json
      def destroy
        @post.destroy
        head :no_content
      end

      private

      def sort_posts(params, posts)
        case params[:sort]
        when 'best'
          posts.best_first
        when 'worst'
          posts.worst_first
        when 'old'
          posts.oldest_first
        else
          posts.newest_first
        end
      end

      # Use callbacks to share common setup or constraints between actions.
      def set_post
        @post = Post.find(params[:id])
      end

      # Only allow a list of trusted parameters through.
      def post_params
        params.permit(:title, :content, :category, :image, :alt_text)
      end
    end
  end
end