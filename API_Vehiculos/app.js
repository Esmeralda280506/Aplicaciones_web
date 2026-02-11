const marcaSelect = document.getElementById("marcaSelect");
const buscarBtn = document.getElementById("buscarBtn");
const resultados = document.getElementById("resultados");
const tipoSelect = document.getElementById("tipoSelect");
const busquedaInput = document.getElementById("busquedaInput");
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

/* Buscar modelos */
buscarBtn.addEventListener("click", () => {

    let marca = marcaInput.value.trim();

    // Si no escribió, usar la seleccionada
    if (marca === "") {
        marca = marcaSelect.value;
    }

    if (!marca) {
        alert("Selecciona o escribe una marca");
        return;
    }

    fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${marca}?format=json`)
        .then(res => res.json())
        .then(data => {
            modelosGlobal = data.Results;
            aplicarFiltros(); // ahora sí funciona
        })
        .catch(error => {
            console.error("Error al cargar modelos:", error);
        });
});

/* Aplicar filtros combinados */
function aplicarFiltros() {
    const tipo = tipoSelect.value;
    const texto = busquedaInput.value;

    let filtrados = modelosGlobal;

    if (tipo !== "todos") {
        filtrados = filtrados.filter(m => obtenerTipo(m.Model_Name) === tipo);
    }

    if (texto !== "") {
        filtrados = filtrados.filter(m =>
            m.Model_Name.toUpperCase().includes(texto)
        );
    }

    mostrarModelos(filtrados);
}

tipoSelect.addEventListener("change", aplicarFiltros);
busquedaInput.addEventListener("keyup", aplicarFiltros);

/* Mostrar tarjetas */
function mostrarModelos(modelos) {
    resultados.innerHTML = `<h3>Vehículos encontrados</h3>`;

    const contenedor = document.createElement("div");
    contenedor.classList.add("cards");

    modelos.forEach(m => {
        const tipo = obtenerTipo(m.Model_Name);

        const card = document.createElement("div");
        card.classList.add("card", tipo);

        card.innerHTML = `
            <h4>${icono} ${m.Make_Name}</h4>
            <p><strong>Modelo:</strong> ${m.Model_Name}</p>
            <p><strong>Tipo:</strong> ${tipo.toUpperCase()}</p>
        `;

        contenedor.appendChild(card);
    });

    resultados.appendChild(contenedor);
}

/* Tipo de vehículo */
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

