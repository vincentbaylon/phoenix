class UserProgressesController < ApplicationController
  before_action :find_user_progress, except: :create
  before_action :authorize, except: :create

  def create
    user_progress = UserProgress.create!(user_progress_params)
    render json: user_progress, status: :created
  end

  def show
    render json: @user_progress, status: :ok
  end

  private
  def find_user_progress
    @user_progress = UserProgress.find_by(user_id: params[:id])
  end

  def user_progress_params
    params.permit(:user_id, :progress_id, :weight, :date)
  end
end
