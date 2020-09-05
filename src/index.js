/* jshint esversion: 6 */
/* moz */

const { prefix, token, giphyKey } = require("./config.json");

const Discord = require("discord.js");
const GphApiClient = require("giphy-js-sdk-core");

const client = new Discord.Client();
giphy = GphApiClient(giphyKey);

banned_words = [/nigg((?:er)|(?:a))/i, /neger/i];

const helplist = [
    `Command prefix: ${prefix}`,
    'gif ...',
    'juice/pappa/sabai/brum/pumpar/bigtime/bigtimerush/nigga/fuck/stalingrad'
]; 

function gifSearch(searchTerm, _message) {
    giphy.search("gifs", {q: searchTerm}).then( (response) => {
        let responseFinal = response.data[Math.floor(Math.random() * 10 + 1) % response.data.length];
        _message.channel.send("Here is your gif kind sir" + _message.author, {files: [responseFial.images.fixed_height.url]}).then();
    }).catch( () => {
        _message.channel.send("ERROR: uhuh, i did a fucky wucky, sowwy :flushed: ").then();
    });
}

function playFile (dir, message) {
    let voiceChannel = message.member.voiceChannel;

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
}

//Startup message
client.once("ready", () => {
    console.log("__BOT ONLINE!_______CTRL_+_C_=>_STOP__");
    client.channels.get('615075756434915349').send('Robert har vaknat!')
});


//Message Listener
client.on('message', (message) => {
    if (message.author.id === "648188761133547560")

    try {
        console.log('Message:', message.content, 'Author:', message.member.user.username);
    } catch (error) {
        console.log('Error in reading message or author');
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

    if (/varför/i.test(message.content) && !message.author.bot) {
        message.channel.send(
            'https://media.discordapp.net/attachments/615075756434915349/707302720800948284/rip_robert.PNG').then()
    }

    if (/69/i.test(message.content) && !message.author.bot) {
        message.channel.send('Nice!').then()
    }

	if (/godnatt/i.test(message.content) && !message.author.bot) {
        message.channel.send(`Godnatt ${message.member.user}`).then()
    }
	
	if (/420/i.test(message.content) && !message.author.bot) {
        message.channel.send('WEED!').then()
    }

    if (/;;häst;;/.test(message.content) && !message.author.bot) {
        gifSearch("Horse", message)
    }

    banned_words.forEach((i) => {
        if (i.test(message.content) && !message.author.bot) {
            if (message.author.id === "241675681258274817") {
                message.author.send("DAVID!, SLUTA!").then();
            } else {
                message.channel.send("SLUTA!").then()
            }
        }
    });

    //DONT TOUCH TO MUCH ;)
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
            delete scp;
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

        case '§connect':
        case '§ringdalahästen':
            try {
                message.member.voiceChannel.join().then();
                console.log("Connected!" + message.member.voiceChannel);
                break;
            } catch (TypeError) {
                console.log("channel undefined")
            }

            break;
        
        case '§disconnect':
            message.member.voiceChannel.leave();
            console.log("Disconected!!" + message.member.voiceChannel);
            break;
    }

    if (message.content.startsWith(prefix)) {
        message.delete().then();
    }
});

client.login(token).then();
