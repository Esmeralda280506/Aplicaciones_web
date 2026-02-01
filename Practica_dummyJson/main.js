const contenedorProductos = document.getElementById("productos")
const Buscador = document.getElementById("Buscador")
const ContenedorProductoDetalle = document.getElementById("producto-detalle")

const lista_productos = (lista) => {
    contenedorProductos.innerHTML = "";

    if (lista.length == 0) {
        contenedorProductos.innerHTML ="No se encontraron productos";
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

