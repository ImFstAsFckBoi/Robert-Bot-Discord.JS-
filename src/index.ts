/* jshint esversion: 6 */


const { prefix, token, giphyKey, devmode } = require("./config.json");

import { ls, statManip} from "./fsMgr";
import {regexTestBlock, prefixSwitch} from "./robertComps";

import {scpSearch} from "./scp";

import Discord from "discord.js";
import { ChannelManager } from "discord.js";
const GphApiClient = require("giphy-js-sdk-core");

const client = new Discord.Client();
const giphyClient = GphApiClient(giphyKey);

let banned_words: RegExp[] = [/n+[ie]+g+((?:e+r+)|(?:a+))/im, /knee gear/im];

const ids = require("./assets/data/idDB.json")


//Startup message
client.once("ready", () => {
    console.log("__BOT ONLINE!_______CTRL_+_C_=>_STOP__");

    if (!devmode) {
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
            break;

        case ids["MARTIN"]: //"SCOOB"
            message.channel.send(message.author.toString(), {files: ["https://cdn.discordapp.com/attachments/615075756434915349/764579130058080306/16718c2.png"]} ).then();
            break;
        
        case ids["PONTUS"]:
            message.react('😍');
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
