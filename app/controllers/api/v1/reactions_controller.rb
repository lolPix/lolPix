module Api
  module V1
    class ReactionsController < ApiController
      before_action :logged_in_user
      before_action :set_reaction, only: %i[show update destroy]

      # GET /reactions/<postId>
      # GET /reactions.json
      def index
        @post = Post.find(params[:post_id])
        @reactions = @post.reactions
        render json: @reactions
      end

      # GET /reactions/1
      # GET /reactions/1.json
      def show
        render json: @reaction
      end

      # POST /reactions
      # POST /reactions.json
      def create
        @reaction = Reaction.new(reaction_params)

        if @reaction.save
          render json: @reaction, status: :created
        else
          render json: @reaction.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /reactions/1
      # PATCH/PUT /reactions/1.json
      def update
        if @reaction.update(reaction_params)
          render json: @reaction, status: :ok
        else
          render json: @reaction.errors, status: :unprocessable_entity
        end
      end

      # DELETE /reactions/1
      def destroy
        @reaction.destroy
        render head :no_content
      end

      private

      # Use callbacks to share common setup or constraints between actions.
      def set_reaction
        @reaction = Reaction.find(params[:id])
      end

      # Only allow a list of trusted parameters through.
      def reaction_params
        params.require(:reaction).permit(:user_id, :post_id, :positive)
      end
    end
  end
end
