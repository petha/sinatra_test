require 'rubygems'
require 'bundler'
Bundler.require
require './rest_application'
require './exception_handling'

#Preload all models
Dir[File.dirname(__FILE__) + '/models/*.rb'].each {|file| require file }
Dir[File.dirname(__FILE__) + '/lib/*.rb'].each {|file| require file }

use ExceptionHandling
run RestApplication