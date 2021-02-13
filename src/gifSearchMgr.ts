import Discord from "discord.js";

function gifSearch(searchTerm: string, _message: Discord.Message, _giphy: any) {
    _giphy.search("gifs", {q: searchTerm}).then( (response: any) => {
        let responseFinal = response.data[Math.floor(Math.random() * 10 + 1) % response.data.length];
        _message.channel.send("Here is your gif kind sir " + _message.author.username, {files: [responseFinal.images.fixed_height.url]}).then();
    }).catch( () => {
        _message.channel.send("ERROR: uhuh, i did a fucky wucky, sowwy :flushed: ").then();
    });
}

export { gifSearch };