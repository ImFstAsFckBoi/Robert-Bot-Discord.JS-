/* jshint esversion: 6 */
/* moz */

const { prefix, token, giphyKey, devmode } = require("./config.json");

const fsMgr = require("./fsMgr");
const robertLib = require("./robertLib")

const scp = require("./scp")

const Discord = require("discord.js");
const GphApiClient = require("giphy-js-sdk-core");

const client = new Discord.Client();
const giphyClient = GphApiClient(giphyKey);

banned_words = [/n+[ie]+g+((?:e+r+)|(?:a+))/im, /knee gear/im];

//Startup message
client.once("ready", () => {
    console.log("__BOT ONLINE!_______CTRL_+_C_=>_STOP__");

    if (!devmode) {
        client.channels.get('615075756434915349').send('Robert har vaknat!')
    }
});


//Message Listener
client.on('message', (message) => {
    if (message.author.id.toString() !== "648188761133547560") {
        try {
            console.log('Message:', message.content, 'Author:', message.member.user.username);
        } catch (error) {
            console.log('Error in reading message or author');
        }
    }

    switch(message.author.id) {

        case "264390450360614912": //SUMA
            message.react('🇩🇪').then()
            break;

        case "376748559212740608": //ANNA
            message.react('🇫🇮').then()
            break;

        case "322290807128457217": //"SCOOB"
            message.channel.send(message.author.toString(), {files: ["https://cdn.discordapp.com/attachments/615075756434915349/764579130058080306/16718c2.png"]} ).then()
            break;
        /*case "174966806606381057":
            message.react('🤡').then()
            break;*/
    }

    robertLib.regexTestBlock(message, giphyClient);

    banned_words.forEach((i) => {
        if (i.test(message.content) && !message.author.bot) {
            if (message.author.id === "241675681258274817") {
                message.author.send("DAVID!, SLUTA!").then();
            } else {
                message.channel.send("SLUTA!").then()
            }

            fsMgr.statManip(message, "n-word", 1);
        }
    });

    scp.scpSearch(message);
    /*
     * ~{THE PREFIX ZONE}~
     */

    if (message.content.slice(0, 1).toString() !== prefix) {return;}

    robertLib.prefixSwitch(message, client, giphyClient);

});

client.on('messageReactionAdd', (reaction) => {
    console.log("BRUH", reaction.emoji.name)

    switch (reaction.emoji.name) {
        case "updoot":
            fsMgr.statManip(reaction.message, "karma", 1)
            break;
        case "downdoot":
            fsMgr.statManip(reaction.message, "karma", -1)
            break;
    }
});

client.on('messageReactionRemove', (reaction) => {
    console.log("BRUH", reaction.emoji.name)

    switch (reaction.emoji.name) {
        case "updoot":
            fsMgr.statManip(reaction.message, "karma", -1)
            break;
        case "downdoot":
            fsMgr.statManip(reaction.message, "karma", 1)
            break;
    }
});
client.login(token).then();
