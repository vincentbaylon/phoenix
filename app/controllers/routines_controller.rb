class RoutinesController < ApplicationController
  before_action :find_routine, except: [:index, :create]
  before_action :authorize, except: [:index, :show]

  def index
    render json: Routine.all, status: :ok
  end

  def create
    routine = Routine.create!(routine_params)
    render json: routine, status: :created
  end

  def show
    render json: @routine, status: :ok
  end

  def update
    @routine.update!(routine_params)
    render json: @routine, status: :accepted
  end

  private
  def find_routine
    @routine = Routine.find(params[:id])
  end

  def routine_params
    params.permit(:name, :id, :user_id, :routine)
  end
end
