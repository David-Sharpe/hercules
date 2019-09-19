# frozen_string_literal: true

class Auth0Controller < ApplicationController

  def callback
    session[:userinfo] = request.env['omniauth.auth']

    redirect_to '/'
  end

  def logout
    session[:userinfo] = nil

    redirect_to '/'
  end

  def failure
    @error_msg = request.params['message']

    redirect_to '/'
  end
end

