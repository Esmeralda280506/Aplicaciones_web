const contenedorProductos = document.getElementById("productos")
const Buscador = document.getElementById("Buscador")
const ContenedorProductoDetalle = document.getElementById("producto-detalle")

const lista_productos = (lista) => {
    contenedorProductos.innerHTML = "";

    if (lista.length == 0) {
        contenedorProductos.innerHTML = "No se encontraron productos";
        return;
    }
    lista.forEach(productos => {
        const html = `
            <a href="detalles.html?id=${productos.id}" class="producto-card">
                <div class="titulo">${productos.title}</div>
                <img src="${productos.thumbnail}" alt="${productos.title}">
                <div class="precio">$${productos.price}</div>
                <div class="categoria">${productos.category}</div>
                <div class="rating">★ ${productos.rating}</div>
            </a>
        `;
        contenedorProductos.innerHTML += html;
    });
};

if (contenedorProductos) {
    fetch("https://dummyjson.com/products")
        .then(res => res.json())
        .then(data => {
            lista_productos(data.products);

        });

    Buscador.addEventListener("keyup", () => {
        const texto = Buscador.value;

        if (texto.length > 0) {
            fetch(`https://dummyjson.com/products/search?q=${texto}`)
                .then(res => res.json())
                .then(data => {
                    lista_productos(data.products);
                });
        } else {
            fetch("https://dummyjson.com/products")
                .then(res => res.json())
                .then(data => {
                    lista_productos(data.products);
                });
        }
    });
}

if (ContenedorProductoDetalle) {
    const params = new URLSearchParams(window.location.search);
    const idProducto = params.get("id");

    if (idProducto) {
        fetch(`https://dummyjson.com/products/${idProducto}`)
            .then(res => res.json())
            .then(prod => {
                let htmlComentarios = "";

                if (prod.reviews) {
                    prod.reviews.forEach(com => {
                        htmlComentarios += `
                            <div class="comentario-item">
                                <strong>${com.reviewerName}</strong>: ${com.comment}
                                <br><small>Calificación: ${com.rating}</small>
                            </div>`;
                    });
                }

                ContenedorProductoDetalle.innerHTML = `
                    <h1>${prod.title}</h1>
                    <img src="${prod.thumbnail}" class="imagen-grande">
                    <p>${prod.description}</p>
                    <h2 class="precio">$${prod.price}</h2>
                    <p class="categoria">Categoría: ${prod.category}</p>
                    <div class="comentarios-seccion">
                        <h3>Comentarios</h3>
                        ${htmlComentarios}
                    </div>
                `;
            });
    }
}
const guardarproducto = () => {
    //creamos las variables de los elementos con los que vamos a interactuar 
    const titulo = document.getElementById("titulo").value
    const precio = parseFloat(document.getElementById("precio").value)
    const categoria = document.getElementById("categoria").value
    const descripcion = document.getElementById("descripcion").value
    const resultado = document.getElementById("mensaje-exito")

    //validamos que los elementos no vengann vacios
    if (!titulo || !precio || !descripcion) {
        alert("Completa los campos obligatorios")
        return
    }

    //creamos el objeto que se va por el body
    const producto = {
        title: titulo,
        price: precio,
        category: categoria,
        description: descripcion,
        thumbnail: 'https://dummyjson.com/image/400x200/008080/ffffff?text' + titulo
    }

    // hacemos la peticion fetch con el metodo post
    fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(producto)
    })
        .then(response => response.json())
        .then(data => {
            console.log("Respuesta del API", data)
            resultado.style.display = "block"
            resultado.innerHTML = `
        <strong>Producto Agregado correctamente!!!</strong><br>
        Id Asignado : ${data.id}<br>
        Nombre : $ {data.title}<br>
        Precio : $${data.price}.00
    `})

}

const eliminarproducto = () => {
    //creamos las variables de los elementos con los que vamos a interactuar 
    const confirmar = confirm("¿Seguro que deseas eliminar este producto?");

    //Confirmamos la accion
    if (!confirmar) return;

    fetch(`https://dummyjson.com/products/${id}`, {
        method: "DELETE"
    })

        .then(res => res.json())
        .then(data => {
            
            alert("Producto eliminado correctamente");

            // Recargamos la lista
            fetch('https://dummyjson.com/products/1', {
                method: 'PUT', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: 'iPhone Galaxy +1'
                })
            })
                .then(res => res.json())
                .then(console.log);
        })
    }



