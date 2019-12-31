class MoviesController < ApplicationController

	def index
		movies = Movie.all

		render json: MovieSerializer.new(movies).to_serialized_json
	end

	def create
		movie = Movie.create(movie_params)
		render json: MovieSerializer.new(movie).to_serialized_json
	end

	def random
		Tmdb::Api.key("448aada9893a31e347236034886c1ced")

		popular_movies = Tmdb::Movie.popular

		top_rated_movies = Tmdb::Movie.top_rated

		movies = popular_movies + top_rated_movies

		random_movie = movies.sample



		if random_movie.poster_path
			poster_path = "https://image.tmdb.org/t/p/w300" + random_movie.poster_path
		end


		movie = Movie.new(title: random_movie.title, rating: random_movie.vote_average, description: random_movie.overview, 
			picture: poster_path, release_date: random_movie.release_date)

		render json: MovieSerializer.new(movie).to_serialized_json


	end

	def search
		# consider putting in model..
		Tmdb::Api.key("448aada9893a31e347236034886c1ced")

		title = params[:search]

		@search = Tmdb::Search.new

		@search.resource('movie')

		@search.query(title)
 		# fetches first five movies

		movies_array = @search.fetch

		#empty array for the movies saved to database
		created_movies = []

		#saves each movie to database
		movies_array.each do |movie|
			if movie["poster_path"]
				poster_path = "https://image.tmdb.org/t/p/w300" + movie['poster_path']
			end

			movie_id = movie['id']
			
			trailer = Tmdb::Movie.trailers(movie_id)

			byebug

			trailer_source = trailer['youtube'][0]['source']

			new_movie = Movie.new(title: movie['title'], rating: movie['vote_average'], description: movie['overview'], 
				picture: poster_path, release_date: movie["release_date"] )

			created_movies << new_movie	
		end



		# renders movies
		render json: MovieSerializer.new(created_movies).to_serialized_json

	end

	def show
		movie = Movie.find(params[:id])

		render json: MovieSerializer.new(movie).to_serialized_json
	end


	private

	def movie_params
		params.require(:movie).permit(:title, :description, :release_date, :picture, :rating)
	end

end
