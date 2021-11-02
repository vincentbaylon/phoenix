class HistoriesController < ApplicationController
  before_action :find_history, except: [:create, :index]

  def index
    
  end

  def create
    render json: History.create!(history_params), status: :created
  end

  def update
    render json: @history.update!(history_params), status: :accepted
  end

  def show
    render json: @history, status: :ok
  end

  def destroy
    @history.destroy
    head :no_content
  end

  def find_last
    render json: History.where(workout_id: params[:id]).second_to_last!, status: :ok
  end

  private
  
  def find_history
    @history = History.find(params[:id])
  end

  def history_params
    params.permit(:user_id, :routine_id, :workout_id, :date, :in_progress, :id)
  end
end
