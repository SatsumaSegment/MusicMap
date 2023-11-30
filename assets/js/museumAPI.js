function displayArtistData() {
    // API setup
    //var artist = $('#search-bar').val().trim();
    var API = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=vangogh`;

    fetch(API)
    .then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data);
        // Information for code here
        var result = data.objectIDs[0];
        var url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${result}`;
        fetch(url)
        .then(function(response) {
            return response.json();
        }).then(function(subdata) {
            console.log(subdata);
        })
    })
}

displayArtistData();