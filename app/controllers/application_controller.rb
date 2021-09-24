class ApplicationController < ActionController::API
  include ActionController::Cookies
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable

  before_action :authorize

  def render_not_found(exception)
    render json: { error: "#{exception.model} not found" }, status: :not_found
  end

  def render_unprocessable(exception)
    render json: { error: exception.record.errors.full_messages }, status: :unprocessable_entity
  end
  
  def authorize
    return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
  end
end
