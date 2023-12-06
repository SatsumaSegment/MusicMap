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
function setMarkers(event, s) {
  event.preventDefault();

  if (s === 0) {
    // Wait for venue data before proceeding
    displayArtistData(event).then(function () {
      // Delete any existing markers
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      // Loop each item in the venues array
      locateBand.forEach(function (item) {
        // Create a new marker
        let marker = new mkr({
          map: map, // Add marker to map
          position: { lat: item.lat, lng: item.lng }, // Set position of marker
        });
        markers.push(marker);
        console.log(item.lat);
      });
    });
  } else if (1) {
    historyArtistData(event).then(function () {
      // Delete any existing markers
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      // Loop each item in the venues array
      locateBand.forEach(function (item) {
        // Create a new marker
        let marker = new mkr({
          map: map, // Add marker to map
          position: { lat: item.lat, lng: item.lng }, // Set position of marker
        });
        markers.push(marker);
        console.log(item.lat);
      });
    });
  }
}

initMap();

// Listen for search button click
searchButton.on("click", function (event) {
  setMarkers(event, 0);
});

historyButton.on("click", function (event) {
  setMarkers(event, 1);
});
