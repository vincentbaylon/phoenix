class SessionsController < ApplicationController
  before_action :authorize, except: [:destroy, :create]

  def create
    user = User.where('lower(username) = ?', params[:username].downcase).first
    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      render json: user, status: :created
    else
      render json: { error: 'Invalid username and/or password' }, status: :unauthorized
    end
  end

  def destroy
    session.destroy
    head :no_content
  end
end
