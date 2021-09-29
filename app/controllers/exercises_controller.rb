class ExercisesController < ApplicationController
  def create
    exercise = Exercise.create!(exercise_params)
    render json: exercise, status: :created
  end

  private

  def exercise_params
    params.permit(:name, :weight, :bodypart)
  end
end
