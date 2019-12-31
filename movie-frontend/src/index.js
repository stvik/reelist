

document.addEventListener("DOMContentLoaded", () => {
	hideSearchedMovies()
	getLists()
	document.getElementById('form-container').style.display = 'none'
	createAddForm()
	const createButton = document.getElementById("create-new-list")

	createButton.addEventListener('click', toggleAddForm)
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

