/* jshint esversion: 6 */


const { prefix, token, giphyKey, devmode } = require("./config.json"); //TODO: MOVE___ + STATS
const ids = require("./assets/data/idDB.json")
const emojis = require("./assets/data/emoji.json")

let version: string;

try
{
    version = require("../package.json")["version"];
}
catch (e)
{
    version = require("./package.json")["version"];
}


import { ls, profileManip} from "./fsMgr";
import {regexTestBlock, prefixSwitch} from "./robertComps";
import {scpSearch} from "./scp";

import Discord from "discord.js";
const GphApiClient = require("giphy-js-sdk-core");
import {argv} from "process"
import { IProfile, Profile } from "./dataStruct";

export const GLOBAL_CLIENT = new Discord.Client();
const giphyClient = GphApiClient(giphyKey);

let banned_words: RegExp[] = [/n+[ie]+g+((?:e+r+)|(?:a+))/im, /knee gear/im];

const quiet = /-q(uiet)?/i.test(argv[2])
    

//Startup message
GLOBAL_CLIENT.once("ready", () => {
    console.log("__BOT_ONLINE!_______CTRL_+_C_=>_STOP__");

    let usr = GLOBAL_CLIENT.user as Discord.ClientUser;
        usr.setUsername("[§...] Robert " + version)

    if (!devmode && !quiet) {
        let c = GLOBAL_CLIENT.channels.cache.get('615075756434915349') as Discord.TextChannel;
        if (c != undefined) {
            c.send('Robert har vaknat! (Och laddar up på Monster™)')
        }
      
    }

    Profile.importAll().forEach((p) => {
        let u = GLOBAL_CLIENT.users.cache.get(p.id);
        
        if (u != undefined)
        {
            console.log(u.username + " updated!")
            new Profile(p).update(u);
        }
    });
});

//Message Listener
GLOBAL_CLIENT.on('message', (message: Discord.Message) => {
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

            if (Math.random() * 100 == 69) {
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
            message.react(emojis[Math.random() * emojis.length]);
            break;
    }

    regexTestBlock(message, giphyClient, GLOBAL_CLIENT);

    banned_words.forEach((i) => {
        if (i.test(message.content) && !message.author.bot) {
            if (Profile.import(message.author.id)[1] == 0) {
                let _ = Profile.import(message.author.id)[0] as IProfile;
                if (_.n_word_pass) {
                    return;
                }
            }
            if (message.author.id == "241675681258274817") {
                message.author.send("DAVID!, SLUTA!").then();
            } else {
                message.channel.send("SLUTA!").then();
            }
                
            profileManip(message, "n_word", 1);
           
            return;
        }
    });

    scpSearch(message);
    
    /*
     * ~{THE PREFIX ZONE}~
     */

    if (message.content.slice(0, 1).toString() !== prefix) {return;}

    prefixSwitch(message, GLOBAL_CLIENT, giphyClient);

});

GLOBAL_CLIENT.on("typingStart", (channel, user, ) =>
{
    /*
    console.log(user.typingDurationIn(channel))
    if (user.id != "376748559212740608") return;
    let c = channel as Discord.TextChannel;
    c.send("yeah type faster " + user.username);
    */
});

GLOBAL_CLIENT.on('messageReactionAdd', (reaction) => {
    console.log("BRUH", reaction.emoji.name);

    switch (reaction.emoji.name) {
        case "updoot":
            profileManip(reaction.message, "karma", 1);
            break;
        
        case "downdoot":
            profileManip(reaction.message, "karma", -1);
            break;
    }
});

GLOBAL_CLIENT.on('messageReactionRemove', (reaction) => {
    console.log("BRUH", reaction.emoji.name);

    switch (reaction.emoji.name) {
        case "updoot":
            profileManip(reaction.message, "karma", -1);
            break;
        case "downdoot":
             profileManip(reaction.message, "karma", 1);
            break;
    }
});

GLOBAL_CLIENT.login(token);
