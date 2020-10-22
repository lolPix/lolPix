module Api
  module V1
    class PostsController < ApplicationController
      protect_from_forgery unless: -> { true }
      before_action :set_post, only: [:show, :edit, :update, :destroy]

      # GET /posts
      # GET /posts.json
      def index
        @posts = Post.all
        respond_to do |format|
          format.all { render json: @posts }
        end
      end

      # GET /posts/1
      # GET /posts/1.json
      def show
        respond_to do |format|
          format.all { render json: @post }
        end
      end

      # GET /posts/new
      def new
        @post = Post.new(params[:post])
        if @post.save
          respond_to do |format|
            format.all { render json: @post }
          end
        else
          # This line overrides the default rendering behavior, which
          # would have been to render the "create" view.
          format.all { render json: @post.errors, status: :unprocessable_entity }
        end
      end

      # GET /posts/1/edit
      def edit
        @post.save
        respond_to do |format|
          format.all { render json: @post }
        end
      end

      # POST /posts
      # POST /posts.json
      def create
        user = User.find_by_username(params[:username])
        @post = Post.new(post_params)
        @post.user = user

        respond_to do |format|
          if @post.save
            format.all { render json: @post, status: :created }
          else
            format.all { render json: @post.errors, status: :unprocessable_entity }
          end
        end
      end

      # PATCH/PUT /posts/1
      # PATCH/PUT /posts/1.json
      def update
        respond_to do |format|
          if @post.update(post_params)
            format.all { render json: @post, status: :ok, location: @post }
          else
            format.all { render json: @post.errors, status: :unprocessable_entity }
          end
        end
      end

      # DELETE /posts/1
      # DELETE /posts/1.json
      def destroy
        @post.destroy
        respond_to do |format|
          format.all { head :no_content }
        end
      end

      private

      # Use callbacks to share common setup or constraints between actions.
      def set_post
        @post = Post.find(params[:id])
      end

      # Only allow a list of trusted parameters through.
      def post_params
        params.permit(:title, :content, :category, :image)
      end
    end
  end
end