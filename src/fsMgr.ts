import discord, { Collection } from "discord.js";
import fs from "fs";

import Discord from "discord.js"
function ls(_message: Discord.Message, type: string, _client: Discord.Client) {
    console.log("NOPE")
    /*
    fs.readFile('./assets/data/stats.json', (error, data) => {
        let json = JSON.parse(data.toString()) as Map<string, Map<string, number>>;
        
        let mentions = _message.mentions.users;
        let msg = type + ":\n";

        if (mentions.size > 0) {
            for (let i of json.get(type)) {
                if (mentions.get(key) !== null) {
                    try {
                        msg += `${_client.users.get(key)}: ${value} \n`;
                    } catch (TypeError) {}
                }
            }
        } else {
            for ([key, value] of Object.entries(json[type])) {
                try {
                    let usr = _client.users.get(key) as Discord.User;
                    msg += `${usr.username}: ${value} \n`;
                } catch (TypeError) {}
            }
        }

        msg += "\n";
        _message.channel.send(msg.toString()).then();
    });
    */
}

function statManip(_message: Discord.Message, type: string, value: string | number) {
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

export { ls, statManip };