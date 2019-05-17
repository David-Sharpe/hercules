require 'rails_helper'

RSpec.describe "home/index.html.haml", type: :view do
  it 'renders the root page' do
    render :template => "home/index.haml"

    expect(rendered).to match /\//
  end
end
