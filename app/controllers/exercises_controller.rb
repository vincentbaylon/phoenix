class ExercisesController < ApplicationController
  before_action :find_exercise, except: :create

  def create
    exercise = Exercise.create!(exercise_params)
    render json: exercise, status: :created
  end

  def show
    render json: @exercise, status: :ok
  end

  def destroy
    @exercise.destroy
    head :no_content
  end

  private

  def find_exercise
    @exercise = Exercise.find(params[:id])
  end

  def exercise_params
    params.permit(:name, :weight, :bodypart, :id)
  end
end
