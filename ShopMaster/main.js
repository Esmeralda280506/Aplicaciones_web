let offset = 0;
const pageSize = 10;

const categorySelect = document.getElementById("category-select");
const sortSelect = document.getElementById("sort-select");
const tableBody = document.getElementById("table-body");
const pageLabel = document.getElementById("page-display");

// Cargar categorías
fetch("https://dummyjson.com/products/category-list")
    .then(res => res.json())
    .then(categories => {
        categories.forEach(category => {
            const option = document.createElement("option");
            option.value = category;
            option.textContent = category;
            categorySelect.appendChild(option);
        });
    });

// Obtener productos
const loadProducts = () => {
    const searchText = document.getElementById("search-input").value;
    const sortOption = sortSelect.value;
    const selectedCategory = categorySelect.value;

    let apiUrl = "https://dummyjson.com/products";

    if (searchText) {
        apiUrl += `/search?q=${searchText}&`;
    } else if (selectedCategory) {
        apiUrl += `/category/${selectedCategory}?`;
    } else {
        apiUrl += "?";
    }

    apiUrl += `limit=${pageSize}&skip=${offset}`;

    if (sortOption) {
        const [field, order] = sortOption.split("-");
        apiUrl += `&sortBy=${field}&order=${order}`;
    }

    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            renderProductsTable(data.products);
            pageLabel.textContent = `Página ${(offset / pageSize) + 1}`;
            updatePagination(data.total);
        });
};

// Renderizar tabla
const renderProductsTable = products => {
    tableBody.innerHTML = "";

    products.forEach(product => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${product.id}</td>
            <td><img src="${product.thumbnail}" class="product-img"></td>
            <td>${product.title}</td>
            <td><span class="badge">${product.category}</span></td>
            <td>$${product.price}</td>
            <td>
                <button class="btn btn-edit" onclick="editProduct(${product.id}, this)">Editar</button>
                <button class="btn btn-delete" onclick="deleteProduct(${product.id}, this)">Eliminar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
};

// Editar
const editProduct = (id, button) => {
    const newTitle = prompt("Nuevo nombre:");
    const newPrice = prompt("Nuevo precio:");

    if (!newTitle || !newPrice) return;

    fetch(`https://dummyjson.com/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle, price: newPrice })
    })
        .then(res => res.json())
        .then(data => {
            const row = button.closest("tr");
            row.children[2].textContent = data.title;
            row.children[4].textContent = `$${data.price}`;
        });
};

// Eliminar
const deleteProduct = (id, button) => {
    fetch(`https://dummyjson.com/products/${id}`, { method: "DELETE" })
        .then(() => button.closest("tr").remove());
};

// Paginación
const updatePagination = total => {
    document.getElementById("next-btn").disabled = offset + pageSize >= total;
    document.getElementById("prev-btn").disabled = offset === 0;
};

// Eventos
document.getElementById("search-form").addEventListener("submit", e => {
    e.preventDefault();
    offset = 0;
    loadProducts();
});

document.getElementById("next-btn").onclick = () => {
    offset += pageSize;
    loadProducts();
};

document.getElementById("prev-btn").onclick = () => {
    offset -= pageSize;
    loadProducts();
};

sortSelect.onchange = () => { offset = 0; loadProducts(); };
categorySelect.onchange = () => { offset = 0; loadProducts(); };

loadProducts();