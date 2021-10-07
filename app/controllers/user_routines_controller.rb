class UserRoutinesController < ApplicationController
  before_action :find_user_routine, except: :create

  def create
    user_routine = UserRoutine.create!(user_routine_params)
    render json: user_routine, include: [:user, :routine], status: :created
  end

  def update
    @user_routine.update!(user_routine_params)
    render json: @user_routine, status: :accepted
  end

  def current
    find_current = UserRoutine.find_by(user_id: params[:id], current: true)
    if find_current
      find_current.update!(current: false)
    end
    render json: find_current, status: :accepted
  end

  private

  def find_user_routine
    @user_routine = UserRoutine.find_by(routine_id: params[:id])
  end

  def user_routine_params
    params.permit(:user_id, :routine_id, :user_routine, :days, :current, :id)
  end
end
