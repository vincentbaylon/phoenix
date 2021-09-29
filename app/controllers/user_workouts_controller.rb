class UserWorkoutsController < ApplicationController
  def create
    user_workout = UserWorkout.create!(user_workout_params)
    render json: user_workout, status: :created
  end

  private

  def user_workout_params
    params.permit(:user_id, :workout_id)
  end
end
