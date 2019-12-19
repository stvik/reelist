class Movie < ApplicationRecord
	has_many :adds
	has_many :lists, through: :adds
end
