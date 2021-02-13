/* jshint esversion: 6 */


const { prefix, token, giphyKey, devmode } = require("./config.json"); //TODO: MOVE___ + STATS
const ids = require("./assets/data/idDB.json")
const emojis = require("./assets/data/emoji.json")
const {version} = require("../package.json")


import { ls, statManip} from "./fsMgr";
import {regexTestBlock, prefixSwitch} from "./robertComps";
import {scpSearch} from "./scp";

import Discord from "discord.js";
const GphApiClient = require("giphy-js-sdk-core");
import {argv} from "process"
import { randomInt } from "crypto";

const client = new Discord.Client();
const giphyClient = GphApiClient(giphyKey);

let banned_words: RegExp[] = [/n+[ie]+g+((?:e+r+)|(?:a+))/im, /knee gear/im];

const quiet = /-q(uiet)?/i.test(argv[2])
    

//Startup message
client.once("ready", () => {
    console.log("__BOT_ONLINE!_______CTRL_+_C_=>_STOP__");

    let usr = client.user as Discord.ClientUser;
        usr.setUsername("[§...] Robert " + version)

    if (!devmode && !quiet) {
        let c = client.channels.cache.get('615075756434915349') as Discord.TextChannel;
        if (c != undefined) {
            c.send('Robert har vaknat! (Och laddar up på Monster™)')
        }
      
    }
});


//Message Listener
client.on('message', (message: Discord.Message) => {
    if (!message.author.bot) {
        try {
            console.log('Message:', message.content, 'Author:', message.author.username);
        } catch (error) {
            console.log('Error in reading message or author');
        }
    }
    
    switch(message.author.id) {

        case ids["SUMA"]: //SUMA
            message.react('🇩🇪').then();
            break;

        case ids["ANNA"]: //ANNA
            message.react('🇫🇮').then();
            
            if (randomInt(0, 100) == 69) {
                message.author.send("https://cdn.discordapp.com/attachments/669537070804500489/809908739678142474/sdasda.png");
            }
            
            break;

        case ids["SCOOB"]: //"SCOOB"
            message.channel.send(message.author.toString(), {files: ["https://cdn.discordapp.com/attachments/615075756434915349/764579130058080306/16718c2.png"]} ).then();
            break;
        
        case ids["PONTUS"]:
            message.react('😍');
            break;
        
        case ids["EVE"]:
            message.react(emojis[randomInt(0, emojis.length)]);
            break;
    }

    regexTestBlock(message, giphyClient);

    banned_words.forEach((i) => {
        if (i.test(message.content) && !message.author.bot) {
            if (message.author.id === "241675681258274817") {
                message.author.send("DAVID!, SLUTA!").then();
            } else {
                message.channel.send("SLUTA!").then();
            }

            statManip(message, "n-word", 1);
        }
    });

    scpSearch(message);
    
    /*
     * ~{THE PREFIX ZONE}~
     */

    if (message.content.slice(0, 1).toString() !== prefix) {return;}

    prefixSwitch(message, client, giphyClient);

});

client.on("typingStart", (channel, user) =>
{
    if (user.id == "174966806606381057") return;
    let c = channel as Discord.TextChannel;
    c.send("yeah type faster " + user.username);
});

client.on('messageReactionAdd', (reaction) => {
    console.log("BRUH", reaction.emoji.name);

    switch (reaction.emoji.name) {
        case "updoot":
            statManip(reaction.message, "karma", 1);
            break;
        case "downdoot":
            statManip(reaction.message, "karma", -1);
            break;
    }
});

client.on('messageReactionRemove', (reaction) => {
    console.log("BRUH", reaction.emoji.name);

    switch (reaction.emoji.name) {
        case "updoot":
            statManip(reaction.message, "karma", -1);
            break;
        case "downdoot":
             statManip(reaction.message, "karma", 1);
            break;
    }
});

client.login(token).then();
