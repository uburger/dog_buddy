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
  // Add icon
  const DOG_ICON = L.icon({
    iconUrl: '/images/hugo.png',
    iconSize:     [60, 50], // size of the icon
    iconAnchor:   [0, 0], // point of the icon which will correspond to marker's location
    popupAnchor:  [33, -10] // point from which the popup should open relative to the iconAnchor
});
  // Add marker
  const MARKER = L.marker([51.505, -0.09], {icon: DOG_ICON}).addTo(MAP);
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
        document.getElementById('markerLat').value = NEW_LAT;
        document.getElementById('markerLon').value = NEW_LON;
      }
    })
  }
  function onMapClick(e) {
   
    MAP.setView(e.latlng);
    MARKER.setLatLng(e.latlng);
    const MEET = "<b>Let's meet for a walk!</b><br> "
    MARKER.bindPopup(`${MEET} LAT: ${e.latlng.lat} LON: ${e.latlng.lng}`).openPopup();
    document.getElementById('markerLat').value = e.latlng.lat;
    document.getElementById('markerLon').value = e.latlng.lng;
    }
  
  MAP.on('click', onMapClick);

  function onMapContext(e) {
    const EVENTMARKER = L.marker([e.latlng.lat, e.latlng.lng],).addTo(MAP);
    MAP.setView(e.latlng);
    EVENTMARKER.setLatLng(e.latlng);
    const DOGEVENT = "<b>Let's create an Event!</b><br> "
    EVENTMARKER.bindPopup(`${DOGEVENT} LAT: ${e.latlng.lat} LON: ${e.latlng.lng}`).openPopup();
    document.getElementById('markerLat').value = e.latlng.lat;
    document.getElementById('markerLon').value = e.latlng.lng;
  }
  MAP.on('contextmenu', onMapContext);
})

