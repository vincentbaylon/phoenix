class UserRoutinesController < ApplicationController
  def create
    user_routine = UserRoutine.create!(user_routine_params)
    render json: user_routine, include: [:user, :routine], status: :created
  end

  private

  def user_routine_params
    params.permit(:user_id, :routine_id, :user_routine, :days)
  end
end
