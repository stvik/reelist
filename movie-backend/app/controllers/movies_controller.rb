class MoviesController < ApplicationController

	def index
		if params[:search]
			movies = Movie.search_movie(params[:search])
		elsif params[:random]
			movies
		else 
			movies = Movie.all
		end

		render json: MovieSerializer.new(movies).to_serialized_json
	end

	def create
		movie = Movie.create(movie_params)
		render json: MovieSerializer.new(movie).to_serialized_json
	end

	def random
		Movie.get_random_movie

		render json: MovieSerializer.new(movie).to_serialized_json

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
