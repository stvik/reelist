class ListSerializer


	def initialize(list_object)
		@list = list_object
	end

	def to_serialized_json
		@list.to_json(:include => {
		:movies => {
			:include => {
				:adds => {except: [:created_at, :updated_at]}
			},
			:except => [:created_at, :updated_at]}		
		},
		:except => [:updated_at])
	end

end