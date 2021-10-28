class TrackersController < ApplicationController
  before_action :find_tracker, except: [:index, :create]

  def index
    render json: Tracker.all, status: :ok
  end

  def create
    render json: Tracker.create!(tracker_params), status: :created
  end

  def show
    render json: @tracker, status: :ok
  end

  def update
    render json: @tracker.update!(tracker_params), status: :accepted
  end

  def destroy
    @tracker.destroy
    head :no_content
  end

  private

  def find_tracker
    @tracker = Tracker.find(params[:id])
  end

  def tracker_params
    params.permit(:id, :exercise_id, :history_id, :set, :reps, :weight, :date, :name)
  end
end
