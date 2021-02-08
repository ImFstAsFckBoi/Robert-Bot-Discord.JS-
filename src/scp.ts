import { DiscordAPIError } from "discord.js";

import Discord from "discord.js";

function scpSearch(_message: Discord.Message) {
    let scp;
    let regex = /scp [0-9]{1,4}/;
    let match = regex.exec(_message.content);
    scp = `${match}`.replace('scp ', '');

    while (scp.startsWith('0')) {
        scp = scp.replace('0', '');
    }

    if (match && !_message.author.bot) {
        console.log('scp', scp);
        let entry;
        if (scp.length >= 3) {
            entry = `${scp}`;
        } else if (scp.length === 2) {
            entry = `0${scp}`;
        } else if (scp.length === 1) {
            entry = `00${scp}`;
        }
        if (entry === "001" && _message.author.id !== "174966806606381057") {
            _message.channel.send('Permission denied: O5 clearance required').then();
            _message.channel.send('http://scp-wiki.wdfiles.com/local--files/scp-001/fractal001').then();
        } else {
            _message.channel.send(`http://www.scp-wiki.net/scp-${entry}`).then();
        }
    }
}

export { scpSearch };