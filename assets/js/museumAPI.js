var searchButton = $('#search-button'); // Search button

function displayArtistData() {
    // API setup
    //var artist = $('#search-bar').val();
    var queryURL = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=picasso`;

    fetch(queryURL)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {

        // ObjectIDs
        console.log(data.objectIDs);

        // Information for code here
        var result = data.objectIDs;

        // Range for results (Set to 20 as default)
        var subResults = result//.slice(1, 200)

        // Sliced ObjectIDs
        console.log(subResults)

        subResults.forEach(function(ID) {     

            var url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${ID}`;

            fetch(url)
            .then(function(response) {
                return response.json();
            })
            .then(function(subData) {

                // Validation for ObjectIDs that have nothing
                if (subData.message === "Not a valid object") {
                    // Use for 404 Error pages when displaying
                    console.log("Page does not exist");
                } else if (subData.city !== "") {
                    console.log(subData);
                 } //else {
                //     // Desired Data
                //     console.log(subData)

                //     // Store desired data in variables
                //     var artistName = subData.artistDisplayName;
                //     var artistNationality = subData.artistNationality;
                //     var artworkName = subData.title;
                //     var artwokDate = subData.objectDate;
                //     var artworkImage = subData.primaryImage;
                //     var artworkCountry = subData.country;
                //     var artworkCity = subData.city;
                // }
            })        
        })
    })
}

displayArtistData();

// Listen for click on search button
searchButton.on('click', displayArtistData);
