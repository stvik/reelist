class CreateMovies < ActiveRecord::Migration[6.0]
  def change
    create_table :movies do |t|
      t.string :title
      t.float :rating
      t.text :description
      t.string :picture
      t.string :release_date
      t.string :trailer

      t.timestamps
    end
  end
end
