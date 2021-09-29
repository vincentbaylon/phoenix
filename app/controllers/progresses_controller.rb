class ProgressesController < ApplicationController
  before_action :authorize, except: :create

  def create
    progress = Progress.create!(progress_params)
    render json: progress, status: :created
  end

  private

  def progress_params
    params.permit()
  end
end
