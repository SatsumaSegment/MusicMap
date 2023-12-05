let map;
let mkr = 0; // Global placeholder for the Marker constructor

// Use async to make sure google maps library is loaded before completing function
async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");      // Import map
  const { Marker } = await google.maps.importLibrary("marker"); // Import markers

  // Create a new map object
  map = new Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
  mkr = Marker; // set global variable to Markers library
}

// Loop venues and set markers
function setMarkers() {
  // Loop each item in the venues array
  locateBand.forEach(function(item) {
    // Create a new marker
    let marker = new mkr({
      map: map,                                   // Add marker to map
      position: { lat: item.lat, lng: item.lng }  // Set position of marker
    });
    console.log(item.lat);
  })
}

initMap();
// Listen for search button click
searchButton.on('click', setMarkers);

