window.addEventListener('DOMContentLoaded', () => {
  // const leafletMap = require('leaflet-map') 
  // Create and load the map
  /*global L*/
  const MAP = L.map('map').setView([51.505, -0.09], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18,
    'useCache': true,
    tileSize: 512,
    zoomOffset: -1,
    }).addTo(MAP);
  // 
  // Add marker
  const MARKER = L.marker([51.505, -0.09]).addTo(MAP);
  const updateButton = document.querySelector("#update-map")
  if(updateButton !== null) {
    updateButton.addEventListener('click', ()=>{
      const LAT_ENTRY = document.querySelector("#lat");
      const LON_ENTRY = document.querySelector("#lon");
      const NEW_LAT = LAT_ENTRY.value;
      const NEW_LON = LON_ENTRY.value;
      if(NEW_LAT !== "" && NEW_LON !== "") {
        MAP.setView([NEW_LAT, NEW_LON], 13);
        MARKER.setLatLng([NEW_LAT, NEW_LON]);
        LAT_ENTRY.value = "";
        LON_ENTRY.value = "";
        const MEET = "<b>Let's meet for a walk!</b><br> "
        MARKER.bindPopup(`${MEET} LAT: ${NEW_LAT} LON: ${NEW_LON}`).openPopup();
      }
    })
  }
  function onMapClick(e) {
    MAP.setView(e.latlng);
    MARKER.setLatLng(e.latlng);
    const MEET = "<b>Let's meet for a walk!</b><br> "
        MARKER.bindPopup(`${MEET} LAT: ${e.latlng.lat} LON: ${e.latlng.lng}`).openPopup();
      }
  MAP.on('click', onMapClick);
})

