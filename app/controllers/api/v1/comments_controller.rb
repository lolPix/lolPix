module Api
  module V1
    class CommentsController < ApplicationController
      before_action :set_comment, only: [:show, :edit, :update, :destroy]

      # GET /comments/<postId>
      # GET /comments.json
      def index
        @post = Post.find(params[:post_id])
        @comments = @post.comments
        respond_to do |format|
          format.all { render json: @comments }
        end
      end

      # GET /comments/1
      # GET /comments/1.json
      def show
        respond_to do |format|
          format.all { render json: @comment }
        end
      end

      # GET /comments/new
      def new
        @comment = @post.comments.build(params[:comment])
        if @comment.save
          respond_to do |format|
            format.all { render json: @comment }
          end
        else
          # This line overrides the default rendering behavior, which
          # would have been to render the "create" view.
          format.all { render json: @comment.errors, status: :unprocessable_entity }
        end
      end

      # GET /comments/1/edit
      def edit
        @comment.save
        respond_to do |format|
          format.all { render json: @comment }
        end
      end

      # POST /comments
      # POST /comments.json
      def create
        @comment = Comment.new(comment_params)

        respond_to do |format|
          if @comment.save
            format.all { render json: @comment, status: :created, location: @comment }
          else
            format.all { render json: @comment.errors, status: :unprocessable_entity }
          end
        end
      end

      # PATCH/PUT /comments/1
      # PATCH/PUT /comments/1.json
      def update
        respond_to do |format|
          if @comment.update(comment_params)
            format.all { render json: @comment, status: :ok, location: @comment }
          else
            format.all { render json: @comment.errors, status: :unprocessable_entity }
          end
        end
      end

      # DELETE /comments/1
      def destroy
        @comment.destroy
        respond_to do |format|
          format.all { head :no_content }
        end
      end

      private

      # Use callbacks to share common setup or constraints between actions.
      def set_comment
        @post = Post.find(params[:post_id])
        @comment = Comment.find(params[:id])
      end

      # Only allow a list of trusted parameters through.
      def comment_params
        params.require(:comment).permit(:content)
      end
    end
  end
end