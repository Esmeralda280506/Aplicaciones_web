let lat
let lon

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (respuesta) => {
            lat = 21.059628324181247
            lon = -98.49375462698794

            const coordenadas = [lat, lon]

            const map = L.map('map').setView(coordenadas, 13);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">Mapa 5C</a>'
            }).addTo(map);

            let marcador = L.marker(coordenadas).addTo(map)
            var polygon = L.polygon([
                [21.059358617128414, -98.49379163967345],
                [21.05943069407008, -98.49386060005482],
                [21.059479694373955, -98.49379518341915],
                [21.059384287779828, -98.49369785004639],
                [21.05935506556044, -98.49372570989114]
            ]).addTo(map);
            marcador.bindPopup('<b>Esoy Aqui ...</b> <br> Mis coordenadas son: <br>Latitud: ' +
                lat + '<br>Longitud: ' + lon).openPopup();
            polygon.bindPopup("Hola este es el lugar en donde vivo.");

        },
        () => {

        })
} else {

}