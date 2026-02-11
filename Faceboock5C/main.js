const selectUsuario = document.getElementById('select-usuario');
const muroDiv = document.getElementById('muro');
const avatarImg = document.getElementById('avatar-id');
const nombreHeader = document.getElementById('nombre-usuario');

//Cargamos los usuarios en el select
fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(usuarios => {
    usuarios.forEach(usuario => {
        const option = `<option value='${usuario.id}'>${usuario.name}</option>`;
        selectUsuario.innerHTML += option;
    })
  })

const cargaMuro = () => {
    const userId = selectUsuario.value;
    const nombre = selectUsuario.options[selectUsuario.selectedIndex].text;

    nombreHeader.innerText = nombre;
    avatarImg.src = "https://api.dicebear.com/9.x/bottts/svg?seed=" + nombre;
    avatarImg.style.display = 'block';

    //Cargar posts del usuario
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
        .then (response => response.json())
        .then (posts => {
            muroDiv.innerHTML = ""; //Limpiamos el muro
            posts.forEach(post => { 
                muroDiv.innerHTML += `
                    <div class="post">
                        <div class="post-title">${post.title}</div>
                        <p class="post-body">${post.body}</p>
                        <small>Publicado por: ${nombre}</small>
                    </div>
                `;
            })
        })
}