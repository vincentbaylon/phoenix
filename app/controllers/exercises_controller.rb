class ExercisesController < ApplicationController
  def create
    exercise = Exercise.create!(exercise_params)
    render json: exercise, status: :created
  end

  def show
    exercise = Exercise.find(params[:id])
    render json: exercise, status: :ok
  end

  private

  def exercise_params
    params.permit(:name, :weight, :bodypart, :id)
  end
end
