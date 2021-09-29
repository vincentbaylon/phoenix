class WorkoutExercisesController < ApplicationController
  def create
    workout_exercise = WorkoutExercise.create!(workout_exercise_params)
    render json: workout_exercise, status: :created
  end

  private

  def workout_exercise_params
    params.permit(:workout_id, :exercise_id)
  end
end
