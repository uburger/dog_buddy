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
    MAP.locate({setView: true, maxZoom: 16});
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
  function onLocationFound(e) {
   var radius = e.accuracy;

    MARKER.setLatLng(e.latlng);
    L.circle(e.latlng, radius).addTo(MAP);
}

MAP.on('locationfound', onLocationFound);

  // function onMapClick(e) {
   
  //   MAP.setView(e.latlng);
  //   MARKER.setLatLng(e.latlng);
  //   const MEET = "<b>Let's meet for a walk!</b><br> "
  //   MARKER.bindPopup(`${MEET} LAT: ${e.latlng.lat} LON: ${e.latlng.lng}`).openPopup();
  //   document.getElementById('markerLat').value = e.latlng.lat;
  //   document.getElementById('markerLon').value = e.latlng.lng;
  //   }
  
  // MAP.on('click', onMapClick);

  function onMapClick(e) {
    MAP.setView(e.latlng);
    MARKER.setLatLng(e.latlng);
    const DOGEVENT = '<form action="/dogevent" method="POST" role="form" id="form" class = "form-horizontal">'+
    '<div class="form-group">'+ 
    '<textarea class="form-control" rows="1" id="headline" name="headline">...</textarea>'+
    '<div class="form-group">'+
        '<label class="control-label col-sm-5"><strong>Date: </strong></label>'+
        '<input type="date" placeholder="Required" id="date" name="date" class="form-control"/>'+ 
        '<input type="time" id="time" name="time" required>'+
    '</div>'+
    
    '<div class="form-group">'+
        '<label class="control-label col-sm-5"><strong>Description: </strong></label>'+
        '<textarea class="form-control" rows="6" id="descript" name="descript">...</textarea>'+
    '</div>'+
    '<input style="display: none;" type="text" id="lat" name="markerLat" value="'+e.latlng.lat+'" />'+
    '<input style="display: none;" type="text" id="lng" name="markerLon" value="'+e.latlng.lng+'" />'+
    '<div class="form-group">'+
      '<div style="text-align:center;" class="col-xs-4 col-xs-offset-2"><button type="button" class="btn">Cancel</button></div>'+
      '<div style="text-align:center;" class="col-xs-4"><button type="submit" value="submit" class="btn btn-primary trigger-submit">Submit</button></div>'+
    '</div>'+
    '</form>';
    MARKER.bindPopup(`${DOGEVENT} LAT: ${e.latlng.lat} LON: ${e.latlng.lng}`).openPopup();
    document.getElementById('markerLat').value = e.latlng.lat;
    document.getElementById('markerLon').value = e.latlng.lng;
  }
  MAP.on('click', onMapClick);
})
