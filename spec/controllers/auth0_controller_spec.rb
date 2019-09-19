require 'rails_helper'

RSpec.describe Auth0Controller, type: :controller do
    describe '#callback' do
        it 'sets userinfo in session' do
            request.env['omniauth.auth'] = 'test data'
            get :callback 
            expect(session[:userinfo]).to eq('test data')
        end

        it 'redirects to the root' do
            get :callback
            expect(response).to redirect_to('/')
        end
    end

    describe '#logout' do
        it "clears session's user info" do
            session[:userinfo] = 'clear me'
            get :logout
            expect(session[:userinfo]).to be_nil
        end

        it 'redirects to the root' do
            get :logout
            expect(response).to redirect_to('/')
        end
    end

    describe '#failure' do
        let (:error_message) { 'test message' }

        it 'sets the error message for the controller' do
            request.params['message'] = error_message
            get :failure
            expect(response).to redirect_to('/')
        end
    end
end
