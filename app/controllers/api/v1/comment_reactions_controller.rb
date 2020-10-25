module Api
  module V1
    class CommentReactionsController < ActionController::API
      before_action :set_reaction, only: [:show, :update, :destroy]

      # GET /comment_reactions/<comment_id>
      # GET /reactions.json
      def index
        @comment = Comment.find(params[:comment_id])
        @reactions = @comment.reactions
        render json: @reactions
      end

      # GET /comment_reactions/1
      # GET /comment_reactions/1.json
      def show
        render json: @reaction
      end

      # POST /reactions
      # POST /reactions.json
      def create
        @reaction = CommentReaction.new(reaction_params)

        if @reaction.save
          render json: @reaction, status: :created
        else
          render json: @reaction.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /comment_reactions/1
      # PATCH/PUT /comment_reactions/1.json
      def update
        if @reaction.update(reaction_params)
          render json: @reaction, status: :ok
        else
          render json: @reaction.errors, status: :unprocessable_entity
        end
      end

      # DELETE /comment_reactions/1
      def destroy
        @reaction.destroy
        render head :no_content
      end

      private

      # Use callbacks to share common setup or constraints between actions.
      def set_reaction
        @reaction = CommentReaction.find(params[:id])
      end

      # Only allow a list of trusted parameters through.
      def reaction_params
        params.require(:comment_reaction).permit(:user_id, :comment_id, :positive)
      end
    end
  end
end
