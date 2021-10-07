class UsersController < ApplicationController
  before_action :find_user, :authorize, except: [:create, :index]

  def index
    render json: User.all, status: :ok
  end

  def create
    render json: User.create!(user_params), status: :created
  end

  def show
    render json: @user, status: :ok
  end

  def update
    @user.update!(user_params)
    render json: @user, status: :accepted
  end

  def destroy
    @user.destroy if @user.id == session[:user_id]
    head :no_content
  end

  private

  def find_user
    @user = User.find(session[:user_id])
  end

  def user_params
    params.permit(:name, :username, :password_digest, :password, :email, :id, :user)
  end
end
