function displayArtistData() {
    // API setup
    //var artist = $('#search-bar').val().trim();
    var queryURL = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=picasso`;

    fetch(queryURL)
    .then(function(response) {
        return response.json();
    }).then(function(data) {

        // ObjectIDs
        console.log(data.objectIDs);

        // Information for code here
        var result = data.objectIDs;

        // Range for results (Set to 20 as default)
        var subResults = result.slice(1, 21)

        // Sliced ObjectIDs
        console.log(subResults)

        subResults.forEach(function(ID) {     

            var url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${ID}`;

            fetch(url)
            .then(function(response) {
                return response.json();
            }).then(function(subData) {

                // Desired Information
                console.log(subData);

            })        
        })
    })
}

displayArtistData();