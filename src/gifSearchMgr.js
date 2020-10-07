function gifSearch(searchTerm, _message, _giphy) {
    _giphy.search("gifs", {q: searchTerm}).then( (response) => {
        let responseFinal = response.data[Math.floor(Math.random() * 10 + 1) % response.data.length];
        _message.channel.send("Here is your gif kind sir" + _message.author, {files: [responseFinal.images.fixed_height.url]}).then();
    }).catch( () => {
        _message.channel.send("ERROR: uhuh, i did a fucky wucky, sowwy :flushed: ").then();
    });
}

module.exports = { gifSearch };