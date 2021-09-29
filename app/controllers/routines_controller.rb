class RoutinesController < ApplicationController
  def index

  end

  def show
    
  end

  def create
    routine = Routine.create!(routine_params)
    render json: routine, status: :created
  end

  def destroy

  end

  private

  def find_routine

  end

  def routine_params
    params.permit(:name, :days, :id, :user_id, :routine)
  end
end
