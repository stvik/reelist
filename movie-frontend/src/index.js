

document.addEventListener("DOMContentLoaded", () => {
	getLists()
	document.getElementById('form-container').style.display = 'none'
	createAddForm()
	const createButton = document.getElementById("create-new-list")

	createButton.addEventListener('click', toggleAddForm)
})

function toggleAddForm() {

	const createForm = document.getElementById('form-container')
	if (createForm.style.display === 'none'){
		createForm.style.display = 'block'
	}
	else {
		createForm.style.display = 'none'
	}
}