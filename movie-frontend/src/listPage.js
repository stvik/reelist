function fetchList(event, listId) {

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


	// const creatorSubH = document.getElementById('creator-sub-header')
	// creatorSubH.innerText = `Created By ${list.creator}`

}

function createListDisplay(list, container) {
		const header = createWithClasses('div', 'ui', 'huge', 'header', 'centered')
		header.id = 'list-header'
		header.innerText = list.name
		container.append(header)

		const subH = createWithClasses('div', 'ui', 'small', 'header', 'centered', 'grey')
		subH.id = 'list-sub-header'
		subH.innerText = `Created By ${list.creator} @ ${list.created_at.split('T')[0]}`
		container.append(subH)

		const movieButton = createWithClasses('button', 'massive', 'ui', 'button', 'fluid', 'circular', 'violet')
		movieButton.innerText = "Find a New Movie"
		container.append(movieButton)

		movieButton.addEventListener('click', searchMovieForm)

// ****************** FIX THIS LATER *******************
		// const deleteButton = createWithClasses('button', 'massive', 'ui', 'button', 'fluid', 'circular', 'red')
		// deleteButton.innerText = "Delete List"
		// container.append(deleteButton)

		// deleteButton.addEventListener('click', (e) => deleteList(e, list.id))


	}

// 		const creatorSubH = createWithClasses('div', 'ui', 'small', 'header', 'centered', 'grey')
// 		creatorSubH.id = 'creator-sub-header'
// 		creatorSubH.innerText = `Created By ${list.creator}`
// 		container.append(creatorSubH)
// }



