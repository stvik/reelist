
function createAddForm() {

	const container = document.getElementById('form-container')


	const header = document.createElement('h1')
	header.innerText = "Create a Movie List"
	container.append(header)

	const form = document.createElement('form')
	form.classList.add('ui', 'form')
	container.append(form)


	const fieldName = document.createElement('div')
	fieldName.classList.add('field')
	form.append(fieldName)

	const labelName = document.createElement('label')
	labelName.innerText = "List Name"
	fieldName.append(labelName)

	const inputName = document.createElement('input')
	inputName.type = "text"
	inputName.name = "name"
	fieldName.append(inputName)

	const fieldCreator = document.createElement('div')
	fieldCreator.classList.add('field')
	form.append(fieldCreator)

	const labelCreator = document.createElement('label')
	labelCreator.innerText = "Creator"
	fieldCreator.append(labelCreator)

	const inputCreator = document.createElement('input')
	inputCreator.type = "text"
	inputCreator.name = "creator"	
	fieldCreator.append(inputCreator)

	const submitButton = document.createElement('button')
	submitButton.type = 'submit'
	submitButton.classList.add('ui', 'teal', 'button')
	submitButton.innerText = "Create List"
	form.append(submitButton)

	const cancelButton = document.createElement('button')
	cancelButton.classList.add('ui', 'button')
	cancelButton.type = 'reset'
	cancelButton.innerText = "Cancel"
	form.append(cancelButton)

	form.addEventListener('submit', createNewList)
	cancelButton.addEventListener('click', toggleAddForm)


}

function createNewList (event) {
	event.preventDefault()
	console.log(event)

	const listName = event.target.name.value
	const listCreator = event.target.creator.value

	const data = {
		'name': listName,
		'creator': listCreator
	}

	const configOp = {
		method: "POST",
		headers: {
			'content-type': 'application/json',
			'Accept': 'application/json'
		},
		body: JSON.stringify(data)
	}

	fetch('http://localhost:3000/lists', configOp)
	.then(resp => resp.json())
	.then(renderList)


	event.currentTarget.reset()
}

function renderList(list) {
	const imageSrc = 'https://www.pngkey.com/png/detail/226-2264513_open-house-film-production-icon-png.png'

	const container = document.getElementById('list-container')

	const card = document.createElement('div')
	card.classList.add('ui', 'card')
	container.prepend(card)

	const imgDiv = document.createElement('div')
	imgDiv.classList.add('image')
	card.append(imgDiv)

	const img = document.createElement('img')
	img.classList.add('ui','medium','circular','image')
	img.src = imageSrc
	card.append(img)

	const contentDiv = document.createElement('div')
	contentDiv.classList.add('content')
	contentDiv.innerHTML = ` <a class="header">${list.name}</a>
    <div class="meta">
      <span class="date">Created on ${list.created_on}</span>
    </div>`
 
	card.append(contentDiv)



	// const header = document.createElement('a')
	// header.classList.add('header')
	// header.innerHTML = 



}

// <div class="ui card">
//   <div class="image">
//     <img src="/images/avatar2/large/kristy.png">
//   </div>
//   <div class="content">
    // <a class="header">Kristy</a>
    // <div class="meta">
    //   <span class="date">Joined in 2013</span>
    // </div>
    // <div class="description">
    //   Kristy is an art director living in New York.
    // </div>
//   </div>
//   <div class="extra content">
//     <a>
//       <i class="user icon"></i>
//       22 Friends
//     </a>
//   </div>
// </div>













