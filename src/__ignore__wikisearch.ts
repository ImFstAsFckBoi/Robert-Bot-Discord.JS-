/* jshint esversion: 6 */


function wikiSearch(searchTerm: string) {
    let rtrnVal: string;

    fetch(`api.php?action=query&list=search&srsearch=${searchTerm}&utf8=&format=json`)
        .then(function(response){return response.json();})
        .then(function(response) {
            fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=info&pageids=${response.query.search[0].pageid}&inprop=url`)
                .then(function(response){return response.json();})
                .then(function(response) {
                    return response.qurey.pages[0]
                });
        });

    
}

