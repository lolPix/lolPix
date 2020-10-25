module Api
  module V1
    class CommentsController < ActionController::API
      before_action :set_comment, only: %i[show update destroy]

      # GET /comments/<postId>
      # GET /comments.json
      def index
        @post = Post.find(params[:post_id])
        @comments = @post.comments
        render json: @comments
      end

      # GET /comments/1
      # GET /comments/1.json
      def show
        render json: @comment
      end

      # POST /comments
      # POST /comments.json
      def create
        @comment = Comment.new(comment_params)

        if @comment.save
          render json: @comment, status: :created
        else
          render json: @comment.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /comments/1
      # PATCH/PUT /comments/1.json
      def update

        if @comment.update(comment_params)
          render json: @comment, status: :ok
        else
          render json: @comment.errors, status: :unprocessable_entity
        end
      end

      # DELETE /comments/1
      def destroy
        @comment.destroy
        head :no_content
      end

      private

      # Use callbacks to share common setup or constraints between actions.
      def set_comment
        @post = Post.find(params[:post_id])
        @comment = Comment.find(params[:id])
      end

      # Only allow a list of trusted parameters through.
      def comment_params
        params.require(:comment).permit(:content, :post_id, :user_id, :parent_id)
      end
    end
  end
end