function searchMovieForm() {

	const displayContainer = document.getElementById('list-show')
	displayContainer.style.display = 'none'


	const container = document.getElementById('find-movie')
	container.style.display = 'block'
	if (!document.getElementById('title-search-div')) {
	const searchDiv = createWithClasses('div', 'ui', 'left', 'icon', 'action', 'input')
	searchDiv.innerHTML = `    <i class="search icon"></i>
    <input type="text" id="title-search-input" placeholder="Search by movie title...">
    <div class="ui violet submit button" id='title-search-button'>Search</div>`
    searchDiv.id = 'title-search-div'
    container.append(searchDiv)

    const divider = createWithClasses('div', 'ui', 'horizontal', 'divider')
    divider.innerText = 'Or'
    container.append(divider)

    const randomButton = createWithClasses('button', 'ui', 'black', 'button')
    randomButton.innerText ='Find a Random Movie'
    container.append(randomButton)

    randomButton.addEventListener('click', getRandomMovie)

	}
	const searchButton = document.getElementById('title-search-button')
	searchButton.addEventListener('click', searchMovie)

}

function getRandomMovie() {
	fetch('http://localhost:3000/movies/random')
	.then(resp => resp.json())
	.then(movie => {
		const movieDisplay = document.getElementById('movie-search-show')
		movieDisplay.style.display = 'block'
		renderMovie(movie.title, movie.rating, movie.description, movie.picture, movie.release_date)
	})
}

function searchMovie(event) {
	const search = document.getElementById('title-search-input').value



		const data = {
			'search': search,
		}	

		const configOp = {
			method: "POST",
			headers: {
				"content-type": 'application/json',
				"Accept": "application/json"
			},
			body: JSON.stringify(data)
		}

		fetch('http://localhost:3000/movies/search', configOp)
		.then(resp => resp.json())
		.then(movies =>  {

		 	const searchList = getSearchList()
		 	removeChildElements(searchList)
			document.getElementById('movie-search-show').style.display = 'block'
		 	const header = createWithClasses('h2', 'ui', 'header')
 			header.innerText = 'Search Results'
 			searchList.append(header)



		 	movies.forEach(movie => {
		 		renderSearches(movie)
		 	})
		})

		event.target.reset
	
}

function renderSearches(movie) {


	const searchResultsList = getSearchList()



	const searchResult = createWithClasses('a', 'item')
	searchResult.innerText = movie.title


	searchResultsList.append(searchResult)

	searchResult.addEventListener('click',() => {renderMovie(movie.title, movie.rating, movie.description, movie.picture, movie.release_date, movie.trailer)})
}



function getSearchList() {
	return document.getElementById('movie-search-list')
}

function renderMovie(title, rating, description, picture, date, trailer) {

	const movieDisplay = document.getElementById('movie-search-display')
	movieDisplay.style.display = 'inline-grid'
	removeChildElements(movieDisplay)

	const header = createWithClasses('h2', 'ui', 'header', 'centered')
	header.innerText = title

	const poster = createWithClasses('img', 'ui', 'medium', 'image', 'centered')
	poster.src = picture

	const movieRating = createWithClasses('h4', 'ui', 'header', "left", "aligned")
	movieRating.innerText = `Rating: ${rating} stars`

	const descriptionTitle = createWithClasses('h4', 'ui', 'header', "left", "aligned")
	descriptionTitle.innerText = `Description:`

	const movieDescription = document.createElement('p')
	movieDescription.innerText = description

	const releaseDate = createWithClasses('h4', 'ui', 'header', "left", "aligned")
	releaseDate.innerText = `Released: ${date}`

	const dropdown = createWithClasses('select', 'ui', 'form', 'selection', 'dropdown')
  

	const listCards = Array.from(document.getElementsByClassName('list-names'))

	

	

	// const menu = document.getElementById('dropdown-choose-list')

	listCards.forEach(list => {
		let listOption = createWithClasses('option')
		listOption.value = list.dataset.id
		listOption.innerText = list.innerText
		// listOption.dataset.id = list.dataset.id
		dropdown.append(listOption)
	})

	const movieTrailer = createWithClasses('iframe')

	movieTrailer.src = `https://www.youtube.com/embed/${trailer}`

	movieTrailer.width ="420" 
	movieTrailer.height="315"
	movieTrailer.align = 'middle'


	const addButton = createWithClasses('button', 'ui', 'primary', 'button')
	addButton.id = 'add-button'
	addButton.innerText = 'Add to List'

	movieDisplay.append(header, poster, movieRating, releaseDate, descriptionTitle, movieDescription, movieTrailer, dropdown, addButton)
	
	addButton.addEventListener('click', () => createMovie(event, title, rating, description, picture, date))

}

function addToList(e, movieId) {

	const listId = e.target.previousSibling.value

	const data = {
		'movie_id': movieId,
		'list_id': listId
	}

	const configOp = {
		method: "POST",
		headers: {
			"content-type": 'application/json',
			"Accept": "application/json"
		},
		body: JSON.stringify(data)
	}

	fetch('http://localhost:3000/adds', configOp)
	.then(resp => resp.json())
	.then(add => increaseMovieCount(add))

	
}

function increaseMovieCount(add) {
	const listId = add.list_id

	const card = document.getElementById(`list-card-${listId}`)

	const movieAdded = card.firstChild.lastChild.firstElementChild

	let numberAdded = parseInt(movieAdded.innerText.slice(13,20))

	movieAdded.innerText = `Movies added: ${numberAdded + 1}`

}

function createMovie(e, title, rating, description, picture, date) {
	const movieData = {
		'title': title,
		'rating': rating,
		'description': description,
		'picture': picture,
		'release_date': date
	}	

	const configOp = {
		method: "POST",
		headers: {
			"content-type": 'application/json',
			"Accept": "application/json"
		},
		body: JSON.stringify(movieData)
	}

 	 fetch('http://localhost:3000/movies', configOp)
	.then(resp => resp.json())
	.then(movie => {
		changeAddButton()
		addToList(e, movie.id)
	})
	
}

function changeAddButton() {

	document.getElementById('add-button').innerText = 'Added!'

}










// <div class="ui placeholder segment">
//   <div class="ui two column very relaxed stackable grid">
//     <div class="column">
//       <div class="ui form">
//         <div class="field">
//           <label>Username</label>
//           <div class="ui left icon input">
//             <input type="text" placeholder="Username">
//             <i class="user icon"></i>
//           </div>
//         </div>
//         <div class="field">
//           <label>Password</label>
//           <div class="ui left icon input">
//             <input type="password">
//             <i class="lock icon"></i>
//           </div>
//         </div>
//         <div class="ui blue submit button">Login</div>
//       </div>
//     </div>
//     <div class="middle aligned column">
//       <div class="ui big button">
//         <i class="signup icon"></i>
//         Sign Up
//       </div>
//     </div>
//   </div>
//   <div class="ui vertical divider">
//     Or
//   </div>
// </div>