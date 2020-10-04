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



function ls(_message, type) {
    fs.readFile('./stats.json', (error, data) => {
        let json = JSON.parse(data.toString());
        let mentions = _message.mentions.users;
        let msg = ""// = type + " points:\n";

        if (mentions.size > 0) {
            for ([key, value] of Object.entries(json[type])) {
                if (mentions[key] !== null) {
                    try {
                        msg += `${client.users.get(key).username}: ${value} \n`;
                    } catch (TypeError) {}
                }
            }
        } else {
            for ([key, value] of Object.entries(json[type])) {
                try {
                    msg += `${client.users.get(key).username}: ${value} \n`;
                } catch (TypeError) {}
            }
        }

        msg += "\n";
        _message.channel.send(msg.toString()).then();
    });
}

function statManip(_message, type, value) {
    fs.readFile('./stats.json', (error, data) => {
        let json = JSON.parse(data.toString());

        if (json[type][_message.author.id.toString()] == null) {
            json[type][_message.author.id.toString()] = value;
        } else {
            json[type][_message.author.id.toString()] += value;
        }

        console.log(_message.author.username, "+ 1", type)
        fs.writeFile('./stats.json', JSON.stringify(json), "utf8", (error) => {
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

function gifSearch(searchTerm, _message) {
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

            statManip(message, "n-word", 1);
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
    else if (message.content.startsWith(prefix + 'ls')) {switchArgs = 'ls'}


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

        case "ls":
            if (/nw/i.test(message.content)) {
                ls(message, "n-word")
            } else if (/krma/i.test(message.content)) {
                ls(message, "karma")
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
            message.react("708416577787396097").then();
            return;
            break;

        case "§downvote":
            message.react("696804691039748157").then();
            return;
            break;

        case '§disconnect':
            message.member.voiceChannel.leave();
            console.log("Disconected!!" + message.member.voiceChannel);
            break;

        case '§test':
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
    switch (reaction.emoji.name) {
        case "updoot":
            statManip(reaction.message, "karma", 1)
            break;
        case "downdoot":
            statManip(reaction.message, "karma", -1)
            break;
    }
});

client.login(token).then();
