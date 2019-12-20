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

	console.log(search)

	let i = 0


		const data = {
			'search': search,
			'number': i
		}	

		const configOp = {
			method: "POST",
			headers: {
				"content-type": 'application/json',
				"Accept": "application/json"
			},
			body: JSON.stringify(data)
		}

		fetch('http://localhost:3000/movies', configOp)
		.then(resp => resp.json())
		.then(movie => console.log(movie))
	
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