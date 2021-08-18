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
    txtInput.value = "";
});

convertirCapitalize.addEventListener('click', (e) =>{
    listaMensajes.classList.toggle('capitalize');
});