let lat
let lon

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(
        (respuesta)=>{
            lat=respuesta.coords.latitude
            lon=respuesta.coords.longitude

            const coordenadas=[lat,lon]

            let map = L.map('map').setView(coordenadas, 13);

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 22,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);

            let marcador = L.marker(coordenadas).addTo(map);
            marcador.bindPopup('<b>Estoy aqui...</b><br>Mis corrdenadas son : <br>latitud : '+lat+'<br>longitud : '+lon).openPopup()

            //alert(lat+" , "+lon)
        },
        ()=>{}


    )


}else{

}