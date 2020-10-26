# frozen_string_literal: true

module Api
  module V1
    # A controller for comments.
    class CommentsController < ActionController::API
      before_action :set_comment, only: %i[show update destroy]

      # GET /comments
      # GET /comments.json
      def index
        if params.key?(:username)
          user = User.find_by_username(params[:username])
          return render head :no_content && return unless user

          comments = Comment.authored_by(user)
        else
          comments = Comment.all
        end

        paginate sort_comments(params, comments), per_page: 15
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

      def sort_comments(params, comments)
        case params[:sort]
        when 'best'
          comments.best_first
        when 'worst'
          comments.worst_first
        when 'old'
          comments.oldest_first
        else
          comments.newest_first
        end
      end

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