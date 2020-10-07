const fs = require("fs");

function ls(_message, type, _client) {
    fs.readFile('./assets/data/stats.json', (error, data) => {
        let json = JSON.parse(data.toString());
        let mentions = _message.mentions.users;
        let msg = type + ":\n";

        if (mentions.size > 0) {
            for ([key, value] of Object.entries(json[type])) {
                if (mentions[key] !== null) {
                    try {
                        msg += `${_client.users.get(key).username}: ${value} \n`;
                    } catch (TypeError) {}
                }
            }
        } else {
            for ([key, value] of Object.entries(json[type])) {
                try {
                    msg += `${_client.users.get(key).username}: ${value} \n`;
                } catch (TypeError) {}
            }
        }

        msg += "\n";
        _message.channel.send(msg.toString()).then();
    });
}

function statManip(_message, type, value) {
    fs.readFile('./assets/data/stats.json', (error, data) => {
        let json = JSON.parse(data.toString());

        if (json[type][_message.author.id.toString()] == null) {
            json[type][_message.author.id.toString()] = value;
        } else {
            json[type][_message.author.id.toString()] += value;
        }

        console.log(_message.author.username, value, type)
        fs.writeFile('./assets/data/stats.json', JSON.stringify(json), "utf8", (error) => {
            if (error) {
                console.log(error)
            }
        });
    });
    /*
    try { //TODO: PERMS
        let member = _reaction.message.member;
        member.setNickname(member.nickname + "(" + updoot[member.user.id] + ")").then(() => {
            console.log(member.nickname);
        });
    } catch () {
        console.log("EWOW")
    }
    */
}

module.exports = { ls, statManip };