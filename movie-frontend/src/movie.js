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


	}
	const searchButton = document.getElementById('title-search-button')
	searchButton.addEventListener('click', searchMovie)

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
		 	removeChildElements(getSearchList())
		 	movies.forEach(movie => renderSearches(movie))
		})
	
}

function renderSearches(movie) {
	console.log(movie)

	const searchResultsList = getSearchList()

	const searchResult = createWithClasses('a', 'item')
	searchResult.innerText = movie.title


	searchResultsList.append(searchResult)

	searchResult.addEventListener('click',() => {renderMovie(movie.title, movie.rating, movie.description, movie.picture, movie.release_date)})
}

function removeChildElements(element) {
	let first = element.firstElementChild
	while (first) {
		first.remove()
		first = element.firstElementChild
	}
}

function getSearchList() {
	return document.getElementById('movie-search-list')
}

function renderMovie(title, rating, description, picture, date) {
	const movieDisplay = document.getElementById('movie-search-display')
	removeChildElements(movieDisplay)

	const header = createWithClasses('h2', 'ui', 'header', 'centered')
	header.innerText = title

	const poster = createWithClasses('img', 'ui', 'medium', 'image', 'centered')
	poster.src = picture

	const movieRating = createWithClasses('h4', 'ui', 'header', "left", "aligned")
	movieRating.innerText = `Rating: ${rating} stars`

	const movieDescription = document.createElement('p')
	movieDescription.innerText = description

	const releaseDate = createWithClasses('h4', 'ui', 'header', "left", "aligned")
	releaseDate.innerText = `Released: ${date}`


	movieDisplay.append(header, poster, movieRating, releaseDate, movieDescription)

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