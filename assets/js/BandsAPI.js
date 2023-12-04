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

        // Artist Information
        var artistName = data[0].artist.name
        var artistImage = data[0].artist.image_url

        // Image and Name
        var img = $(`<img src='${artistImage}' class="img-fluid rounded-start" alt="...">`)
        var artistH1 = $(`<h1 class="card-title">${artistName}</h1>`).attr("style", "text-align: center;" )

        var imgDiv = $("#artistImg")
        var infoDiv = $("#artistInfo")
        

        imgDiv.append(img)
        infoDiv.append(artistH1)

        // Links to Socials
        var artistLinks = data[0].artist.links
        var filtered = artistLinks.filter(val => val.type === 'soundcloud' || val.type === 'spotify' || val.type === 'twitter')

        filtered.forEach(function(LK) {

            // Buttons
            var linkName = LK.type.charAt(0).toUpperCase() + LK.type.slice(1);
            var linkURL = LK.url

            var linkButton = $(`<a href="${linkURL}" class="btn btn-primary" type="button">${linkName}</a>`)

            var btnDiv = $("#artistButtons")

            btnDiv.append(linkButton)

            console.log*linkURL
        })


        // Venue Information
        data.forEach(function(ID) {

            // Venue Location
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
