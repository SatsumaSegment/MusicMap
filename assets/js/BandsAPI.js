// Global Variables
var searchButton = $("#search-button");
var clearButton = $("#historyClear");
var locateBand = [];



// Display Artist
function displayArtistData(event) {
  event.preventDefault();

  // API setup
  var input = $("#search-input").val();

  // Checkboxes
  var pastC = $("#checkbox-1");
  var upcomingC = $("#checkbox-2");

  // Validation for API Date Time
  if (pastC.is(":checked") && !upcomingC.is(":checked")) {
    var time = "Past";
  } else if (upcomingC.is(":checked") && !pastC.is(":checked")) {
    var time = "Upcoming";
  } else if (upcomingC.is(":checked") && pastC.is(":checked")) {
    var time = "All";
  } else {
    var time = "";
  }

  // API URL
  var queryURL = `https://rest.bandsintown.com/artists/${input}/events?app_id=foo&date=${time}`;

  // Fetch Data
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Information and variables
      var imgDiv = $("#artistImg");
      var nameDiv = $("#artistName");
      var btnDiv = $("#artistButtons");

      imgDiv.empty();
      nameDiv.empty();
      btnDiv.empty();

      if (data == "") {
        var noImg = $(
          `<img src='https://placehold.jp/ffffff/000000/720x722.png?text=No%20Upcoming%20Events%20With%20This%20Artist' class="img-fluid rounded-start" alt="...">`
        );
        var noResults = $(
          `<h3 style="text-align: center;" class="align-middle">Sorry Artist Cannot Be Found Or Has No Upcoming Events</h3>`
        );
        nameDiv.append(noResults);
        imgDiv.append(noImg);
        return;
      }

      // console.log(data);

      // Artist Information
      var artistName = data[0].artist.name;
      var artistImage = data[0].artist.image_url;

      // Image and Name
      var img = $(
        `<img src='${artistImage}' class="img-fluid rounded-start" alt="...">`
      );
      var artistH1 = $(`<h1 class="card-title">${artistName}</h1>`).attr(
        "style",
        "text-align: center;"
      );

      imgDiv.append(img);
      nameDiv.append(artistH1);

      // Links to Socials
      var artistLinks = data[0].artist.links;
      var filtered = artistLinks.filter(
        (val) =>
          val.type === "soundcloud" ||
          val.type === "spotify" ||
          val.type === "twitter"
      );

      filtered.forEach(function (LK) {
        // Buttons
        var linkName = LK.type.charAt(0).toUpperCase() + LK.type.slice(1);
        var linkURL = LK.url;

        var linkButton = $(
          `<a href="${linkURL}" class="btn btn-primary" type="button">${linkName}</a>`
        );

        btnDiv.append(linkButton);
      });

      locateBand = [];

      // Venue Information
      data.forEach(function (ID) {
        // Venue Location
        var venue = ID.venue;
        var city = venue.city;
        var latitude = venue.latitude;
        var longitude = venue.longitude;
        var location = venue.location;
        var latLng = {
          lat: parseFloat(latitude),
          lng: parseFloat(longitude),
        };
        locateBand.push(latLng);
      });

      // Add History
      var existingHistory = JSON.parse(localStorage.getItem("history")) || [];
      existingHistory.push(artistName);
      localStorage.removeItem("history");
      localStorage.setItem("history", JSON.stringify(existingHistory));

        var dropdown = $("#dropdownList")
        dropdown.empty();
        existingHistory.forEach(function(Name) {
            var createList = $(`<li><a class="dropdown-item" data-name=${Name}>${Name}</a></li>`)
            dropdown.append(createList)
        })
    });
}

// Removing History
function removeHistory(event) {
    
    event.preventDefault();
    localStorage.clear("history");
    artistHistory = [];
    var dropdown = $("#dropdownList")
    dropdown.empty();

}

// History On Load  
var dropdown = $("#dropdownList");
var existingHistory = JSON.parse(localStorage.getItem("history")) || [];
existingHistory.forEach(function(Name) {

    var createList = $(`<li><a class="dropdown-item" data-name=${Name}>${Name}</a></li>`)
    dropdown.append(createList)

})

// Listen for click on search button
searchButton.on("click", displayArtistData);

// Listen for clicks on clear button
clearButton.on("click", removeHistory);
