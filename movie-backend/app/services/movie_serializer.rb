class MovieSerializer

	def initialize(movie_object)
		@movie = movie_object
	end

	def to_serialized_json
		@movie.to_json(:except => [:updated_at, :created_at])
	end

end