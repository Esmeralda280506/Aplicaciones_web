let lat
let lon

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(
        (respuesta)=>{
            lat = 21.0593630
            lon = -98.4938190

            const coordenadas=[lat,lon]

            const map = L.map('map').setView(coordenadas, 13);

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">Mapa 5C</a>'
            }).addTo(map);

            let marcador = L.marker(coordenadas).addTo(map);
            var polygon = L.polygon([
                [21.0593637, -98.4936976],
                [21.0593568, -98.4937855],
                [21.0593962, -98.4938076],
                [21.0594403, -98.4937399]
            ]).addTo(map);
            marcador.bindPopup('<b>Estoy aqui...</b><br>Mis corrdenadas son : <br>latitud : '+lat+'<br>longitud : '+lon).openPopup()
            polygon.bindPopup("Hola esta es mi casa");
            //alert(lat+" , "+lon)
        },
        ()=>{}

    )

}else{

}