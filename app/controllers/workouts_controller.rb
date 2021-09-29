class WorkoutsController < ApplicationController
  before_action :find_workout, except: :create
  before_action :authorize, except: :show

  def create
    workout = Workout.create!(workout_params)
    render json: workout, include: :routine_workout, status: :created
  end

  def show
    render json: @workout, status: :ok
  end

  private

  def find_workout
    @workout = Workout.find(params[:id])
  end

  def workout_params
    params.permit(:name)
  end
end
