const marcaSelect = document.getElementById("marcaSelect");
const buscarBtn = document.getElementById("buscarBtn");
const resultados = document.getElementById("resultados");
const tipoSelect = document.getElementById("tipoSelect");
const marcaInput = document.getElementById("marcaInput");

let modelosGlobal = [];

/* Cargar marcas */
fetch("https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json")
    .then(res => res.json())
    .then(data => {
        data.Results.forEach(marca => {
            const option = document.createElement("option");
            option.value = marca.Make_Name;
            option.textContent = marca.Make_Name;
            marcaSelect.appendChild(option);
        });
    });

/* Buscar por marca */
buscarBtn.addEventListener("click", () => {
    const marca = marcaSelect.value || marcaInput.value;

    if (!marca) {
        resultados.innerHTML = "<p>Selecciona o escribe una marca</p>";
        return;
    }

    fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${marca}?format=json`)
        .then(res => res.json())
        .then(data => {
            modelosGlobal = data.Results;
            aplicarFiltros();
        })
        .catch(error => {
            console.error("Error al cargar modelos:", error);
        });
});

/* Aplicar filtros SOLO por tipo */
function aplicarFiltros() {
    const tipo = tipoSelect.value;

    let filtrados = modelosGlobal;

    if (tipo !== "todos") {
        filtrados = filtrados.filter(
            m => obtenerTipo(m.Model_Name) === tipo
        );
    }

    mostrarModelos(filtrados);
}

tipoSelect.addEventListener("change", aplicarFiltros);

/* Mostrar resultados */
function mostrarModelos(modelos) {
    resultados.innerHTML = `<h3>Vehículos encontrados (${modelos.length})</h3>`;

    if (modelos.length === 0) {
        resultados.innerHTML += "<p>No se encontraron vehículos</p>";
        return;
    }

    const contenedor = document.createElement("div");
    contenedor.classList.add("cards");

    modelos.forEach(m => {
        const tipo = obtenerTipo(m.Model_Name);

        const card = document.createElement("div");
        card.classList.add("card", tipo);

        card.innerHTML = `
            <h4>${m.Make_Name}</h4>
            <p><strong>Modelo:</strong> ${m.Model_Name}</p>
            <p><strong>Tipo:</strong> ${tipo.toUpperCase()}</p>
        `;

        contenedor.appendChild(card);
    });

    resultados.appendChild(contenedor);
}

/* Detectar tipo de vehículo */
function obtenerTipo(modelo) {
    const nombre = modelo.toLowerCase();

    if (nombre.includes("suv") || nombre.includes("rav") || nombre.includes("cr-v"))
        return "suv";
    if (nombre.includes("truck") || nombre.includes("f-") || nombre.includes("silverado"))
        return "pickup";
    if (nombre.includes("van") || nombre.includes("caravan") || nombre.includes("sienna"))
        return "van";
    if (nombre.includes("sport") || nombre.includes("gt") || nombre.includes("mustang"))
        return "deportivo";

    return "auto";
}


