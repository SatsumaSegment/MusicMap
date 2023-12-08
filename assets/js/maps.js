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
    center: { lat: 5.0, lng: 34.0 },
    zoom: 2,
  });
  mkr = Marker; // set global variable to Markers library
}

// Loop venues and set markers
function setMarkers(event, s) {
  event.preventDefault();
  if (s === 0) {
    // Wait for venue data before proceeding
    displayArtistData(event).then(addMarkers);
  } else if (1) {
    historyArtistData(event).then(addMarkers);
  }
}

function addMarkers() {
  // Delete any existing markers
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  // Loop each item in the venues array
  locateBand.forEach(function (item) {
    // Check if it's past or future gig and change modal accordingly
    if (item.startTime !== "") {
      // Format the Date and Time
      var date = item.startTime.split("T")[0];
      var time = item.startTime.split("T")[1];
      var contentString = `<div class="popup text-center"><h1><strong>${item.artist}</strong></h1>
      <h5>is performing at</h5>
      <h3 class="mt-0"><strong>${item.venueName}</strong></h3>
      <h5>on</h5>
      <h3 class="mt-0"><strong>${date}</strong></h3><h5> at </h5><h3 class="mt-0"><strong>${time}</strong></h3>
      <div class"row">
      <h4 style="text-align: left;"><strong>Address</strong>:</h4> <h5>${item.street}</h5>
      </div>
      <h4 style="text-align: left;"><strong>Location</strong>:</h4> <h5>${item.location}</h5>
      </div>`;
    } else {
      var contentString = `<div class="popup text-center"><h1><strong>${item.artist}</strong></h1>
      <h5>performed at</h5>
      <h3 class="mt-0"><strong>${item.venueName}</strong></h3>`;
    }
    // Create a new marker
    let marker = new mkr({
      map: map, // Add marker to map
      position: { lat: item.latitude, lng: item.longitude }, // Set position of marker
    });
    markers.push(marker);
    const infowindow = new google.maps.InfoWindow({
      content: contentString,
      maxWidth: 400,
    });

    marker.addListener("click", function () {
      closeOtherInfo();
      infowindow.open(marker.get("map"), marker);
      InforObj[0] = infowindow;
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
searchButton.on("click", function (event) {
  setMarkers(event, 0);
});

historyButton.on("click", function (event) {
  if (
    event.target.textContent !=
    JSON.parse(localStorage.getItem("history")).join("")
  ) {
    $("#search-input").val(event.target.textContent);
    setMarkers(event, 1);
  }
});
