class RoutineWorkoutsController < ApplicationController
  def create
    routine_workout = RoutineWorkout.create!(routine_workout_params)
    render json: routine_workout, include: :workout, status: :created
  end

  private

  def routine_workout_params
    params.permit(:routine_id, :workout_id, :day)
  end
end
