function fetchList(event, listId) {

	console.log(listId)

	const createForm = document.getElementById('form-container')
	const displayContainer = document.getElementById('list-show')
	const searchForm = document.getElementById('find-movie')
	createForm.style.display = 'none'
	displayContainer.style.display = 'block'
	searchForm.style.display = 'none'





	fetch(`http://localhost:3000/lists/${listId}`)
	.then(resp => resp.json())
	.then(renderShowList)

}

function renderShowList(list) {

	const listsContainer = document.getElementById('list-container')

	// listsContainer.style.display = 'none'
	const container = document.getElementById('list-show')

	if (!document.getElementById('list-header')) {
		createListDisplay(list, container)
	}else {
		updateList(list, container)
	}



}

function updateList(list, container){

	const foundHeader = document.getElementById('list-header')
	foundHeader.innerText = list.name

	const subH = document.getElementById('list-sub-header')
	subH.innerText = `Created By ${list.creator} @ ${list.created_at.split('T')[0]}`


	const movies = list.movies

	const adds = list.adds

	const movieItems = document.getElementById('movie-items-container')
	removeChildElements(movieItems)


	movies.forEach(movie => {
		renderMovieItem(movie, movieItems, list.id, adds)
	})

}

function renderMovieItem(movie, container, listId, adds) {

	const movieItem = createWithClasses('div', 'item')

	container.style.backgroundColor = 'white'
	container.style.padding = '10%'


	adds.forEach(add => {
		if (add.movie_id === movie.id) {
			movieItem.dataset.id = `${add.id}`
		}
	})


	movieItem.innerHTML = `
     <div class="ui small image">
      <img src="${movie.picture}">
    </div>
    <div class="content">
      <div class="header">${movie.title}</div>
      <div class="meta">
        <span class="price">${movie.rating} Stars  | </span>
        <span class="stay">Released: ${movie.release_date}</span>
      </div>
       <div class="description">
        <p>${movie.description}</p>
      </div>
      <div class="extra">
	     <span class="right floated trash ui button">
	      <i class="trash alternate outline icon"></i>
	      Remove
	    </span>
    </div>
 `
 const deleteButton = movieItem.querySelector('span.trash')

 deleteButton.addEventListener('click', () => {deleteAdd(event, movie.id, listId)})

  container.append(movieItem)

  removeHomePage()


}

function deleteAdd(e, movieId, listId) {

	const movieItem = e.target.parentNode.parentElement.parentElement
	const addId = movieItem.dataset.id

	movieItem.remove()
	decreaseMovieCount(listId)

	fetch(`http://localhost:3000/adds/${addId}`, {'method': 'DELETE'})
	.catch(error => alert(error))



	}

	function decreaseMovieCount(listId) {

	const card = document.getElementById(`list-card-${listId}`)

	const movieAdded = card.firstChild.lastChild.firstElementChild

	let numberAdded = parseInt(movieAdded.innerText.slice(13,20))

	movieAdded.innerText = `Movies added: ${numberAdded - 1}`

}

function createListDisplay(list, container) {
		hideLists()
		console.log(list)
		const header = createWithClasses('div', 'ui', 'huge', 'header', 'centered', 'inverted', 'grey')
		header.id = 'list-header'
		header.innerText = list.name
		container.append(header)

		const subH = createWithClasses('div', 'ui', 'small', 'header', 'centered', 'inverted', 'olive')
		subH.id = 'list-sub-header'
		subH.innerText = `Created By ${list.creator} @ ${list.created_at.split('T')[0]}`
		container.append(subH)

		const movieButton = createWithClasses('button', 'massive', 'ui', 'button', 'circular', 'violet', 'fluid')
		const buttonDiv = document.createElement('div')
		buttonDiv.style.display = 'flex'
		buttonDiv.align = 'middle'
		container.append(buttonDiv)
		movieButton.innerText = "Find a New Movie"
	
		buttonDiv.append(movieButton)
		movieButton.addEventListener('click', searchMovieForm)

		const movieItems = createWithClasses('div', 'ui', 'items')
		movieItems.id = 'movie-items-container'
		container.append(movieItems)

		const movies = list.movies
		const adds = list.adds

		movies.forEach(movie => {
			renderMovieItem(movie, movieItems, list.id, adds)
		})

		
	}

// 		const creatorSubH = createWithClasses('div', 'ui', 'small', 'header', 'centered', 'grey')
// 		creatorSubH.id = 'creator-sub-header'
// 		creatorSubH.innerText = `Created By ${list.creator}`
// 		container.append(creatorSubH)
// }



