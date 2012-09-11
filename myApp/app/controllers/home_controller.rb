class HomeController < ApplicationController

  respond_to :html, :json

  def index
  end

  def api
  	respond = {:a=>'bb'}

  	respond_to do |format|
  		format.json {render :json => {:result => "ok"}}
  	end
  end
end
