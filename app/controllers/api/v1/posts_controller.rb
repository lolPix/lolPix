module Api
  module V1
    class PostsController < ActionController::API
      before_action :set_post, only: [:show, :edit, :update, :destroy]

      # GET /posts
      # GET /posts.json
      def index
        paginate Post.unscoped, per_page: 15
      end

      # GET /posts/1
      # GET /posts/1.json
      def show
        render json: @post
      end

      # GET /posts/new
      def new
        @post = Post.new(params[:post])
        if @post.save
          render json: @post
        else
          # This line overrides the default rendering behavior, which
          # would have been to render the "create" view.
          render json: @post.errors, status: :unprocessable_entity
        end
      end

      # GET /posts/1/edit
      def edit
        @post.save
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