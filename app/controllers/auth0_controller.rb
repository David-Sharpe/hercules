# frozen_string_literal: true

class Auth0Controller < ApplicationController

  def callback
    session[:userinfo] = request.env['omniauth.auth']['info']
    cookies[:jwt] = request.env['omniauth.auth']['credentials']['id_token']
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

