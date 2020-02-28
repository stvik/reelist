class AddsController < ApplicationController

	# def index 
	# 	adds = Add.all
	# 	render json: adds
	# end

	# def show
	# 	add = Add.find(params[:id])
	# 	rend json: add
	# end

	def create
		add = Add.create(adds_params)
		render json: add
	end

	def destroy
		add = Add.find(params[:id])
		add.destroy
	end


	private

	def adds_params

		params.require(:add).permit(:movie_id, :list_id)
		
	end
end
