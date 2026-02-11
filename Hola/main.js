const coleccion_docentes = [
    {
        nombre: "Luis alberto",
        apellidos: "Mendoza San Juan",
        puesto: "Profesor investigador",
        edad: 41,
        estado: true
    },
    {
        nombre: "Dr. Efrén",
        apellidos: "Juarez Castillo",
        puesto: "Profesor investigador",
        edad: 55,
        estado: false
    },
    {
        nombre: "Hermes",
        apellidos: "Salazar Casanova",
        puesto: "Profesor investigador",
        edad: 43,
        estado: true
    },
]

const mostrar = () => {
    //rescatamos el div que va a contener la información LMendoza70
    const contenedor = document.getElementById("contenedor")

    contenedor.innerHTML = ""
    coleccion_docentes.forEach((docente) => {
        if (docente.estado)
            contenedor.innerHTML += 
            "<div class='tarjeta'>"
            +"<h2>"+docente.nombre+"</h2>"+
            "</div>";
    })
}