/* jshint esversion: 6 */
/* moz */

let devmode = true;

const { prefix, token, giphyKey } = require("./config.json");

const fs = require('fs')
const Discord = require("discord.js");
const GphApiClient = require("giphy-js-sdk-core");

const client = new Discord.Client();
giphy = GphApiClient(giphyKey);

banned_words = [/n+[ie]+g+((?:e+r+)|(?:a+))/im, /knee gear/im];


const helplist = [
    `Command prefix: ${prefix}`,
    'gif ...',
    'juice/pappa/sabai/brum/pumpar/bigtime/bigtimerush/nigga/fuck/stalingrad'
];

function karmaCounter(_reaction) {


    fs.readFile('./karma.json', (error, data) => {
        let updoot = JSON.parse(data.toString());

        let value;

        switch (_reaction.emoji.name) {
            case "updoot":
                value = 1;
                break;

            case "downdoot":
                value = -1;
                break;
        }

        if (updoot[_reaction.message.author.id] == null) {
            updoot[_reaction.message.author.id] = value;
        } else {
            updoot[_reaction.message.author.id] += value;
        }

        console.log(updoot);

        fs.writeFile('./karma.json', JSON.stringify(updoot), "utf8", (error) => {
            if (error) {
                console.log(error)
            }
        });

        /*try { //TODO: PERMS
            let member = _reaction.message.member;
            member.setNickname(member.nickname + "(" + updoot[member.user.id] + ")").then(() => {
                console.log(member.nickname);
            });
        } catch () {
            console.log("EWOW")
        }*/
    });
}

function nWordCounter(_message) {
    fs.readFile('./nord.json', (error, data) => {
        let json = JSON.parse(data.toString());

        if (json[_message.author.id.toString()] == null) {
            json[_message.author.id.toString()] = 1;
        } else {
            json[_message.author.id.toString()] += 1;
        }

        fs.writeFile('./nord.json', JSON.stringify(json), "utf8", (error) => {
            if (error) {
                console.log(error)
            }
        });
    });
}

function gifSearch(searchTerm, _message) { //TODO: NEEDS TO BE FIXED DONT KNOW HOW
    giphy.search("gifs", {q: searchTerm}).then( (response) => {
        let responseFinal = response.data[Math.floor(Math.random() * 10 + 1) % response.data.length];
        _message.channel.send("Here is your gif kind sir" + _message.author, {files: [responseFinal.images.fixed_height.url]}).then();
    }).catch( () => {
        _message.channel.send("ERROR: uhuh, i did a fucky wucky, sowwy :flushed: ").then();
    });
}

function playFile (dir, message, vc = message.member.voiceChannel) {
    try {
        let voiceChannel = vc;

        if (voiceChannel === undefined) {
            message.channel.send('Must be in voice channel');
            return;
        }

        if (voiceChannel.joinable) {
            console.log("*Connecting...*" + voiceChannel);
            voiceChannel.join()
                .then(connection => {
                    console.log("Connected!" + voiceChannel);
                    let dispatcher = connection.playFile(dir);

                    dispatcher.on("end", () => {
                        console.log("*Disconnecting...*" + voiceChannel);
                        setTimeout( () => {
                            voiceChannel.leave();
                        }, 1000);
                    });
                }); //.catch(() => {
            //message.channel.send("ERROR: uhuh, i did a fucky wucky, sowwy :flushed: ")
            //});
        } else {
            message.channel.send("Cannot join Voice channel!");
        }
    } catch {
            message.member.voiceChannel.leave().catch();
    }

}

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

        case "264390450360614912":
            message.react('🇩🇪').then()
            break;

        case "376748559212740608":
            message.react('🇫🇮').then()
            break;

        /*case "174966806606381057":
            message.react('🤡').then()
            break;*/
    }

    /*
    function MessageReact( regex, message) {
        if (regex.test(message.content) && !message.author.bot) {
            message.channel.send(message)
        }
    }

    function MessageReactSendMessage() {

    }*/

    if (/varför/i.test(message.content) && !message.author.bot) {
        message.channel.send('https://media.discordapp.net/attachments/615075756434915349/707302720800948284/rip_robert.PNG').then();
    }

    if (/69/i.test(message.content) && !message.author.bot) {
        message.channel.send('Nice!').then();
    }

	if (/godnatt/i.test(message.content) && !message.author.bot) {
        message.channel.send(`Godnatt ${message.member.user}`).then();
    }
	
	if (/420/i.test(message.content) && !message.author.bot) {
        message.channel.send('WEED!').then();
    }

    if (/;;häst;;/.test(message.content) && !message.author.bot) {
        gifSearch("Horse", message);
    }

    if (/disclaimer/.test(message.content) && !message.author.bot) {
        message.channel.send("https://images-ext-1.discordapp.net/external/9wvdoyYOWGK7YHVhT7dpb-iWMRCleJ1qDCTujbyjRIE/https/media.discordapp.net/attachments/615075756434915349/755022937387433995/gif_2.gif").then();
    }

    if (/queer/.test(message.content) && !message.author.bot) {
        message.channel.send("Queer är en slur").then();
    }

    banned_words.forEach((i) => {
        if (i.test(message.content) && !message.author.bot) {
            if (message.author.id === "241675681258274817") {
                message.author.send("DAVID!, SLUTA!").then();
            } else {
                message.channel.send("SLUTA!").then()
            }

            nWordCounter(message);
        }

    });

    //DONT TOUCH TO MUCH ;)
    let scp
	const regex = /scp [0-9]{1,4}/;
    let match = regex.exec(message.content)
    scp = `${match}`.replace('scp ', '')

    while (scp.startsWith('0')) {
        scp = scp.replace('0', '')
    }

    // SCP SERACH MONKA
    if (match && !message.author.bot) {
        console.log('scp', scp)
        let entry;
        if (scp.length >= 3) {
            entry = `${scp}`
        } else if (scp.length === 2) {
            entry = `0${scp}`
        } else if (scp.length === 1) {
            entry = `00${scp}`
        }
        if (entry === "001" && message.author.id !== "174966806606381057") {
            message.channel.send('Permission denied: O5 clearance required').then()
            message.channel.send('http://scp-wiki.wdfiles.com/local--files/scp-001/fractal001').then()
        } else {
            message.channel.send(`http://www.scp-wiki.net/scp-${entry}`).then()
        }
    }
    // SCP SERACH MONKA

    /*
     * ~{THE PREFIX ZONE}~
     */

    if (message.content.slice(0, 1).toString() !== prefix) {return;}

    let switchArgs = message.content.slice(1);

    if (message.content.startsWith(prefix + 'gif')) {switchArgs = 'gif';}
    else if (message.content.startsWith(prefix + 'epadiss')) { switchArgs = 'epadiss'; }
    else if (message.content.startsWith(prefix + 'juwaini')) { switchArgs = 'juwaini'; }
    else if (message.content.startsWith(prefix + prefix + 'kill')) {switchArgs = '§kill'}
    else if (message.content.startsWith(prefix + 'nw')) {switchArgs = 'nw'}


    switch (switchArgs) {

        case 'help':
            for (let i of helplist) {
                message.channel.send(prefix + i).then(); //TODO: DM + EMBED
            }

            break;
        //GIF search
        case 'gif':
            gifSearch(message.content.slice(4), message)
                
            break;

        //Play soundfile
        default:

            let dir;

            switch (switchArgs) {
                case 'juice':
                    dir = 'assets/juice2.mp3';
                    break;
                case 'pappa':
                    dir = 'assets/pappa2.mp3';
                    break;
                case 'sabai':
                    dir = 'assets/Inspelning_24.mp3';
                    break;
                case 'brum':
                    dir = 'assets/Per_anderstrom (1).mp3';
                    break;
                case 'pumpar':
                    dir = 'assets/adrenalinenpumpar.mp3';
                    break;
                case 'bigtimerush':
                    dir = 'assets/bigtime.m4a';
                    break;
                case 'bigtime':
                    dir = 'assets/bigtime.mp3';
					break;
				case 'pontus':
					dir = 'assets/pontus.mp3';
					break;
				case 'fuck':
					dir = 'assets/Fuck_no_baby_vine-[AudioTrimmer.com].mp3';
                    break;
				case 'stalingrad':
					dir = 'assets/stalingrad.mp3'
					break
				case 'corpus':
					dir = 'assets/corpus.mp3'
                    break
                case 'anis':
                    dir = 'assets/anis.mp3'
                    break
                default:
                    break
            }

            playFile(dir, message);

            break;

        case 'prank':
            //console.log(message.author.voiceChannel + typeof(message.author.voiceChannel))
            playFile('assets/bigtime.mp3', message, client.channels.get('743070954900553871'))
            break;

        case "nw":
            if (!/ls/i.test(message.content)) {
                break;
            }

            if (message.mentions.users.first())
            {
                let user = message.mentions.users.first();

                fs.readFile('./nord.json', (error, data) => {
                    let msg = "";

                    for ([key, value] of Object.entries(JSON.parse(data.toString()))) {
                        if (user.id.toString() === key) {
                            msg += `${client.users.get(key).username}: ${value} \n`;
                        }
                    }

                    msg += "\n"
                    //console.log(msg);
                    message.channel.send(msg).then();
                });
            } else {
                fs.readFile('./nord.json', (error, data) => {
                    let msg = "";

                    for ([key, value] of Object.entries(JSON.parse(data.toString()))) {
                        msg += `${client.users.get(key).username}: ${value} \n`;
                    }

                    msg += "\n"
                    //console.log(msg);
                    message.channel.send(msg).then();
                });
            }

            break;

        case '§connect':
        case '§ringdalahästen':
            try {
                message.member.voiceChannel.join().then();
                console.log("Connected!" + message.member.voiceChannel);
                break;
            } catch (TypeError) {
                console.log("channel undefined");
            }

            break;
        case "§upvote":
            message.react("708416577787396097");
            return;
            break;

        case "§downvote":
            message.react("696804691039748157");
            return;
            break;

        case '§disconnect':
            message.member.voiceChannel.leave();
            console.log("Disconected!!" + message.member.voiceChannel);
            break;

        case '§test':
            //TEMP FÖR PRINT list//TODO fixa :(
            if (message.mentions.users.first())
            {
                let user = message.mentions.users.first();

                fs.readFile('./karma.json', (error, data) => {
                    let msg = "";

                    for ([key, value] of Object.entries(JSON.parse(data.toString()))) {
                        if (user.id.toString() === key) {
                            msg += `${client.users.get(key).username}: ${value} \n`;
                        }
                    }

                    msg += "\n"
                    //console.log(msg);
                    message.channel.send(msg).then();
                });
            } else {
                fs.readFile('./karma.json', (error, data) => {
                    let msg = "";

                    for ([key, value] of Object.entries(JSON.parse(data.toString()))) {
                        msg += `${client.users.get(key).username}: ${value} \n`;
                    }

                    msg += "\n"
                    //console.log(msg);
                    message.channel.send(msg).then();
                });
            }
            //TEMP//
            break;

        case '§kill':
            let code = message.content.slice(7);
            console.log("EXIT WITH CODE:", code);
            message.delete().then();
            process.exit(parseInt(code));
            break;
    }

    if (message.content.startsWith(prefix)) {
        message.delete().then();
    }
});

client.on('messageReactionAdd', (reaction) => {
    if (reaction.emoji.name === "updoot" || reaction.emoji.name === "downdoot") {
        karmaCounter(reaction)
        console.log(reaction);
    }

});

client.login(token).then();
