//TODO
const txtInput = document.querySelector('#txtInput');
const btnGuardar = document.querySelector('#btnGuardar');
const listaMensajes = document.querySelector('#listaMensajes');
const convertirCapitalize = document.querySelector('#convertirCapitalize');

btnGuardar.addEventListener('click', (e) =>{
	e.preventDefault();
	const listElement = document.createElement('li');
	const textNode = document.createTextNode(txtInput.value);
	listElement.appendChild(textNode);
	listaMensajes.appendChild(listElement);
	txtInput.value = '';
});

/*convertirCapitalize.addEventListener('click', (e) =>{
    listaMensajes.classList.toggle('capitalize');
});
*/

convertirCapitalize.addEventListener('click', () =>{
	const list = listaMensajes.children;
	for(let element of list){
		let listWords = element.textContent.trim().split(' ')
			.filter(word => word != '')
			.map(word => {
				return word.toString().charAt(0).toUpperCase() + word.substr(1);
			});
		element.textContent = listWords.join(' ');
	}
});