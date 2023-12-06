var map;
var mkr = 0; // Global placeholder for the Marker constructor
var InforObj = [];
var markers = []; // Arry of markers on map

// Use async to make sure google maps library is loaded before completing function
async function initMap() {
  const { Map } = await google.maps.importLibrary("maps"); // Import map
  const { Marker } = await google.maps.importLibrary("marker"); // Import markers

  // Create a new map object
  map = new Map(document.getElementById("map"), {
    center: { lat: 52.3555, lng: 1.1743 },
    zoom: 6,
  });
  mkr = Marker; // set global variable to Markers library
}

// Loop venues and set markers
function setMarkers(event) {
  event.preventDefault();
  // Wait for venue data before proceeding
  displayArtistData(event).then(function () {
    // Delete any existing markers
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    // Loop each item in the venues array
    locateBand.forEach(function (item) {
      var contentString = `<div><h1 style="color: blue;">${item.location}</h1></div>`
      // Create a new marker
      let marker = new mkr({
        map: map, // Add marker to map
        position: { lat: item.latitude, lng: item.longitude }, // Set position of marker
      });
      markers.push(marker);
      console.log(item.ven);

      const infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 200
    });

    marker.addListener('click', function () {
      closeOtherInfo();
      infowindow.open(marker.get('map'), marker);
      InforObj[0] = infowindow;
  });
    });
  });
  
}

function closeOtherInfo() {
  if (InforObj.length > 0) {
      /* detach the info-window from the marker ... undocumented in the API docs */
      InforObj[0].set("marker", null);
      /* and close it */
      InforObj[0].close();
      /* blank the array */
      InforObj.length = 0;
  }
}

initMap();

// Listen for search button click
searchButton.on("click", setMarkers);
