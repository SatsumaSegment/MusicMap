var searchButton = $('#search-button');

function displayArtistData(event) {

    event.preventDefault();

    // API setup
    var input = $('#search-input').val();

    // Checkboxes
    var pastC = $('#checkbox-1')
    var upcomingC = $('#checkbox-2')

    // Validation for API Date Time
    if (pastC.is(":checked") && !upcomingC.is(":checked")) {
        var time = 'Past'
    } else if (upcomingC.is(":checked") && !pastC.is(":checked")) {
        var time = 'Upcoming'
    } else if (upcomingC.is(":checked") && pastC.is(":checked")) {
        var time = 'All'
    } else {
        var time = ''
    }

    // API URL
    var queryURL = `https://rest.bandsintown.com/artists/${input}/events?app_id=foo&date=${time}`;

    // Fetch Data
    fetch(queryURL)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {

        // Information
        console.log(data);

        // Information for code here
        data.forEach(function(ID) {

            var artistName = input
            var venue = ID.venue;
            var city = venue.city
            var latitude = venue.latitude;
            var longitude = venue.longitude;
            var location = venue.location;

        });
    });
};

// Listen for click on search button
searchButton.on('click', displayArtistData);
