class Movie < ApplicationRecord
	has_many :adds
	has_many :lists, through: :adds

	def self.search_movie(title) 
		Tmdb::Api.key(ENV["TMDB_API_KEY"])

		@search = Tmdb::Search.new

		@search.resource('movie')

		@search.query(title)

		movies_array = @search.fetch

		created_movies = []

		#Creates new instances of 'movie'
		movies_array.each do |movie|
			if movie["poster_path"]
				poster_path = "https://image.tmdb.org/t/p/w300" + movie['poster_path']
			end

			movie_id = movie['id']
			
			movie_trailer = Tmdb::Movie.trailers(movie_id)

			trailer_source = nil

			if movie_trailer['youtube'].any?
				trailer_source = movie_trailer['youtube'][0]['source']
			end

			new_movie = self.new(title: movie['title'], rating: movie['vote_average'], description: movie['overview'], 
				picture: poster_path, release_date: movie["release_date"], trailer: trailer_source)

			created_movies << new_movie	

		end

		return created_movies
	end
end
