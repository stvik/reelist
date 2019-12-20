class MoviesController < ApplicationController

	def index
		movies = Movie.all

		render json: MovieSerializer.new(movies).to_serialized_json
	end

	def show
		movie = Movie.find(params[:id])

		render json: MovieSerializer.new(movie).to_serialized_json
	end

	def create


		Tmdb::Api.key("448aada9893a31e347236034886c1ced")

		title = params[:search]

		@search = Tmdb::Search.new

		@search.resource('movie')

		@search.query(title)
 

		movie = @search.fetch[params[:number]]

		poster_path = "https://image.tmdb.org/t/p/w300" + movie['poster_path']

		new_movie = Movie.create(title: movie['title'], rating: movie['vote_average'], description: movie['overview'], picture: poster_path, release_date: movie["release_date"] )

		render json: MovieSerializer.new(new_movie).to_serialized_json
	

	end
end
