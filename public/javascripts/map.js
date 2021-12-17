window.addEventListener('DOMContentLoaded', () => { 
  /*global L*/
  const MAP = L.map('map')
  const mapLat = sessionStorage.getItem('currentLat');
  const mapLon = sessionStorage.getItem('currentLon');
  const mapZoom = sessionStorage.getItem('currentZoom');
  if (mapLat) {
      MAP.setView([mapLat, mapLon], mapZoom)
      sessionStorage.removeItem('currentLat');
      sessionStorage.removeItem('currentLon');
      sessionStorage.removeItem('currentZoom');
  } else {
  MAP.locate({setView: true, maxZoom: 16});
  }
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18,
    'useCache': true,
    tileSize: 512,
    zoomOffset: -1,
    }).addTo(MAP);
  // Add icon
  const userImage = document.getElementById("user_image").innerHTML
  const DOG_ICON = L.icon({
    iconUrl: `data:image/jpeg;base64,${userImage}`,
    iconSize:     [50, 50], // size of the icon
    iconAnchor:   [0, 0], // point of the icon which will correspond to marker's location
    popupAnchor:  [33, -10] // point from which the popup should open relative to the iconAnchor
  });
  // Add marker
  const MARKER = L.marker([51.505, -0.09], {icon: DOG_ICON}).addTo(MAP);
  const updateButton = document.querySelector("#update-map")
  // Show events
  /*global dogevents*/
    dogevents.forEach((dogevent) => {
      /*global allUser */
    const eventOrganizer = allUser.find(user => user.email === dogevent.eventOrganizer)
    const organizerIcon = L.icon({
      iconUrl: `data:image/jpeg;base64,${eventOrganizer.imageBase64}`,
      iconSize:     [50, 50], // size of the icon
      iconAnchor:   [0, 0], // point of the icon which will correspond to marker's location
      popupAnchor:  [33, -10] // point from which the popup should open relative to the iconAnchor
    });
    // eslint-disable-next-line no-unused-vars
    const EVENT_MARKER = L.marker([dogevent.eventLat, dogevent.eventLon], {icon: organizerIcon}).addTo(MAP);
    EVENT_MARKER.bindPopup(`<h4>${dogevent.eventHeadline} </h4>
    <p> ${dogevent.eventDescript} </p> 
    Time: ${dogevent.eventDate} ${dogevent.eventTime} <br> 
    With: ${dogevent.eventOrganizer} <br> 
    LAT: ${dogevent.eventLat} <br>
    LON: ${dogevent.eventLon} <br>
    <p class=temperature></p>
    <p class=weather></p>`);
    // add eventlistener for click to grab weather
    EVENT_MARKER.addEventListener('click', function(){
      fetch(`https://api.openweathermap.org/data/2.5/find?lat=${dogevent.eventLat}&lon=${dogevent.eventLon}&cnt=1&units=metric&appid=${WEATHER_API_KEY}`)
      .then(response => response.json())
      .then(data => {
          console.log(data.list[0])
          const tempValue = data.list[0]['main']['temp']; 
          const descValue = data.list[0]['weather'][0]['main']; 
          const desc = document.querySelector('.weather');
          const temp = document.querySelector('.temperature');
          temp.innerHTML =`Temperature: ${tempValue}°C`;
          desc.innerHTML = `Weather: ${descValue}`;
      })
  .catch(() => alert("Nothing here"))
  })
  })
  // Update Button Code
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
  function onLocationFound(e) {
   var radius = e.accuracy;

    MARKER.setLatLng(e.latlng);
    L.circle(e.latlng, radius).addTo(MAP);
  }
  MAP.on('locationfound', onLocationFound);

  function onMapClick(e) {
    MAP.setView(e.latlng);
    MARKER.setLatLng(e.latlng);
    const DOGEVENT = '<form action="/dogevent" method="POST" role="form" id="form" class = "form-horizontal">'+
    '<div class="form-group">'+ 
    '<textarea class="form-control" rows="1" id="headline" name="headline">...</textarea>'+
    '<div class="form-group">'+
        '<label><strong>Date: <br></strong></label>'+
        '<input type="date" placeholder="Required" id="date" name="date" class="form-control"/>'+ 
        '<input type="time" id="time" name="time" required>'+
    '</div>'+
    '<div class="form-group">'+
        '<label><strong>Description: </strong></label><br>'+
        '<textarea class="form-control" rows="6" id="descript" name="descript">...</textarea>'+
    '</div>'+
    '<input style="display: none;" type="text" id="lat" name="markerLat" value="'+e.latlng.lat+'" />'+
    '<input style="display: none;" type="text" id="lng" name="markerLon" value="'+e.latlng.lng+'" />'+
    '<button type="submit" value="submit" class="submit">Create Event</button><br>'+
    '</form>';
    MARKER.bindPopup(`${DOGEVENT} LAT: ${e.latlng.lat} <br> LON: ${e.latlng.lng}`).openPopup();
  }
  MAP.on('click', onMapClick);
  
  window.addEventListener("beforeunload", function () {
    const currentCenter = MAP.getCenter()
    sessionStorage.setItem('currentLat', currentCenter.lat)
    sessionStorage.setItem('currentLon', currentCenter.lng)
    sessionStorage.setItem('currentZoom', MAP.getZoom())
  });

})
