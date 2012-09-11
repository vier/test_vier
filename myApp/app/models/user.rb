class User < ActiveRecord::Base
  attr_accessible :description, :id, :nickname, :password
end
