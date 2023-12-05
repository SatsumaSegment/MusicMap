let map;
let mkr = 0;

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");
  const { Marker } = await google.maps.importLibrary("marker");

  map = new Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
  mkr = Marker;
}

function setMarkers() {
  locateBand.forEach(function(item) {
    let marker = new mkr({
      map: map,
      position: { lat: item.lat, lng: item.lng }
    });
    console.log(item.lat);
  })
}

initMap();
searchButton.on('click', setMarkers);

