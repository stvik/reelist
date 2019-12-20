class ListsController < ApplicationController

	def index
		lists = List.all

		render json: ListSerializer.new(lists).to_serialized_json
	end

	def show

		list = List.find(params[:id])

		render json: ListSerializer.new(list).to_serialized_json

	end

	def create

		list = List.create(list_params)


		render json: list
	end

	def destroy
		list = List.find(params[:id])
		list.destroy

	end

	private

	def list_params

		params.require(:list).permit(:name, :creator)

	end

end
