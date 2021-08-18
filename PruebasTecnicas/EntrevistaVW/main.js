//TODO
const txtInput = document.querySelector('#txtInput');
const btnGuardar = document.querySelector('#btnGuardar');
const listaMensajes = document.querySelector('#listaMensajes');

btnGuardar.addEventListener('click', (e) =>{
    e.preventDefault();
    const listElement = document.createElement('li');
    const textNode = document.createTextNode(txtInput.value);
    listElement.appendChild(textNode);
    listaMensajes.appendChild(listElement);
    txtInput.value = "";
});