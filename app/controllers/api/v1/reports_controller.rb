# frozen_string_literal: true

module Api
  module V1
    # Controller for Reports
    class ReportsController < ActionController::API
      before_action :set_report, only: %i[show update destroy]

      # GET /reports/<postId>
      # GET /reports.json
      def index
        if params.key?(:post_id)
          @post = Post.find(params[:post_id])
          @reports = @post.reports
        else
          @reports = Report.all
        end
        paginate @reports, per_page: 15
      end

      # GET /reports/1
      # GET /reports/1.json
      def show
        render json: @report
      end

      # POST /reports
      # POST /reports.json
      def create
        @report = Report.new(report_params)

        if @report.save
          render json: @report, status: :created
        else
          render json: @report.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /reports/1
      # PATCH/PUT /reports/1.json
      def update
        if @report.update(report_params)
          render json: @report, status: :ok
        else
          render json: @report.errors, status: :unprocessable_entity
        end
      end

      # DELETE /reports/1
      def destroy
        @report.destroy
        render head :no_content
      end

      private

      # Use callbacks to share common setup or constraints between actions.
      def set_report
        @report = Report.find(params[:id])
      end

      # Only allow a list of trusted parameters through.
      def report_params
        params.require(:report).permit(:user_id, :post_id, :description, :resolved)
      end
    end
  end
end
