class MovieSerializer

	def initialize(movie_object)
		@movie = movie_object
	end

	def to_serialized_json
		@movie.to_json(:include => {
		:adds => {except: [:created_at, :updated_at]}
		},
		:except => [:updated_at, :created_at])
	end

end