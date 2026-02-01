const selectUsuario = document.getElementById("select-usuario")
const muroDiv = document.getElementById("muro")
const avatarImg = document.getElementById("avatar-img")
const nombreHeader = document.getElementById("nombre-usuario")

//Cargamos los usuarios en el select
fetch("https://jsonplaceholder.typicode.com/users")
.then (response=>response.json())
    .then(data=>{
        data.forEcah(usuario=>{
        const opcion='<opcion value ="'+usuario.id+'">'+usuario.name+'</opcion>'
        selectUsuario.innerHTML+=opcion
        })
})


//que va a pasar cada que selecciono un usuario
const cargaMuro=()=>{
    const userId = selectUsuario.value
    const nombre = selectUsuario.opcions[selectUsuario.selectedIndex].text

    nombreHeader.innerText = nombre
    avatarImg.src="https://api.dicebear.com/9.x/dylan/svg?seed"=+nombre
    avatarImg.style.display="block"

    //cargamos el muro
    fetch("https://jsonplaceholder.typicode.com"+userId+ "/post")
    .then (response=>response.json())
    .then(posts=>{
        //limpiaos el muro por si hay post de otro usuario
        MuroDiv.innerHTML =""
        //recorremos post por post para dibujarlos
        posts.forEcah(post=>{
            muroDiv.innerHTML+='<div class="post">'+
           '<div class="post-title">'+post.title+'</div>'
           +'<p>'+ post.body+'</p>'
           +'</div>'
        })
    })
}