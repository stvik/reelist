

document.addEventListener("DOMContentLoaded", () => {

	hideSearchedMovies()
	hideLists()
	homePage()
	// getLists()
	document.getElementById('form-container').style.display = 'none'
	createAddForm()
	const createButton = document.getElementById("create-new-list")

	createButton.addEventListener('click', toggleAddForm)

	const homeLink = document.getElementById('home-page')
	homeLink.addEventListener('click', homePage)

	const container = document.getElementById('list-show')
	const searchMovieCont = document.getElementById('find-movie')

	const listLink = document.getElementById('lists-page')
	listLink.addEventListener('click', () => {
		removeChildElements(container)
		hideSearchedMovies()
		getLists()
		searchMovieCont.style.display = 'none'
	})
})

function toggleAddForm() {

	const createForm = document.getElementById('form-container')
	const displayList = document.getElementById('list-show')
	const searchForm = document.getElementById('find-movie')
	if (createForm.style.display === 'none'){
		createForm.style.display = 'block'
		displayList.style.display = 'none'
		searchForm.style.display = 'none'
	}
	else {
		createForm.style.display = 'none'
		displayList.style.display = 'block'
	}
}

function removeHomePage() {

		// const container = document.getElementById('list-show')
		// removeChildElements(container)
}

function homePage() {
		const searchContainer = document.getElementById('find-movie')
		searchContainer.style.display = 'none'

		hideLists()
		hideSearchedMovies()

		const container = document.getElementById('list-show')
		removeChildElements(container)
		container.style.display = 'inline'

		const header = createWithClasses('h1', "ui",  'center', 'aligned', 'icon', "header", 'inverted', 'grey')
		header.innerHTML = `<i class="circular film icon"></i>
  ReelList`
  		container.append(header)

  		const firstButtonDiv = createWithClasses('div')
  		firstButtonDiv.display ='flex'
  		firstButtonDiv.align = 'middle'
  		container.append(firstButtonDiv)

  		container.append(document.createElement('br'))

  		const secondButtonDiv = createWithClasses('div')
  		secondButtonDiv.display ='flex'
  		secondButtonDiv.align = 'middle'
  		container.append(secondButtonDiv)


		const searchButton = createWithClasses('button', 'huge', 'ui', 'button', 'circular', 'violet')
		searchButton.innerText = "Find a New Movie"
		firstButtonDiv.append(searchButton)



		const listsButton = createWithClasses('button', 'huge', 'ui', 'button', 'circular', 'black')
		listsButton.innerText = "View lists"
		secondButtonDiv.append(listsButton)

		searchButton.addEventListener('click', () => {
			removeChildElements(container)
			searchMovieForm()
		})

		listsButton.addEventListener('click', () => {
			removeChildElements(container)
			getLists()
		})
}


function createWithClasses(element, ...classListValues) {
	const newElement = document.createElement(element)
	classListValues.forEach(name => {
		newElement.classList.add(`${name}`)
	})
	return newElement
}

function hideLists() {
	document.getElementById('list-container').style.display ='none'
}

function hideSearchedMovies() {
	document.getElementById('movie-search-show').style.display ='none'
}

function removeChildElements(element) {
	let first = element.firstElementChild
	while (first) {
		first.remove()
		first = element.firstElementChild
	}
}

