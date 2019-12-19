class List < ApplicationRecord
	has_many :adds
	has_many :movies, through: :adds
end
