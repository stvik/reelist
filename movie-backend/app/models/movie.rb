class Movie < ApplicationRecord
	has_many :adds
	has_many :lists, through: :adds

	api_key = Tmdb::Api.key(ENV["TMDB_API_KEY"])

	def self.search_movie(title) 
	
		@search = Tmdb::Search.new

		@search.resource('movie')

		@search.query(title)

		movies_array = @search.fetch

		return movies_array.map do |movie|
			create_movie(movie)
		end
	end


	def self.get_random_movie

		movies = Tmdb::Movie.popular + Tmdb::Movie.top_rated

		random_movie = movies.sample

		return create_movie(movie)

	end

	def self.create_movie(movie)

		trailer_source = get_trailer(movie)

		poster_path = get_poster_path(movie)

		movie = self.new(title: movie['title'], rating: movie['vote_average'], description: movie['overview'], 
			picture: poster_path, release_date: movie['release_date'], trailer: trailer_source)

	end

	def self.get_trailer(movie)
		movie_trailer = Tmdb::Movie.trailers(movie['id'])

		if movie_trailer['youtube'].any?
			return trailer_source = movie_trailer['youtube'][0]['source']
		else
			return nil
		end
	end

	def self.get_poster_path(movie)
		if movie['poster_path']
			poster_path = "https://image.tmdb.org/t/p/w300" + movie['poster_path']
		else 
			poster_path = 'https://s.studiobinder.com/wp-content/uploads/2017/12/Movie-Poster-Template-Dark-with-Image.jpg?x81279'
		end

	end
end
