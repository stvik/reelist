# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Tmdb::Api.key("448aada9893a31e347236034886c1ced")

Movie.destroy_all

movie_title = Tmdb::Movie.find('lord of the rings').first.title

Movie.create(title: movie_title )

50.times do
	movie = Tmdb::Find(rand(1000))
	Movie.create()
	
end