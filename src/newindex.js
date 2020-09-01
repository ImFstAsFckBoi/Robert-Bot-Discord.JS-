/* jshint esversion: 6 */
/* moz */
const { prefix, token, giphyKey } = require("./config.json");

const Discord = require("discord.js");
const fs = require('fs')
const GphApiClient = require("giphy-js-sdk-core");

const client = new Discord.Client();
giphy = GphApiClient(giphyKey);

banned_words = ['nigger', 'nigga', 'Nigger', 'Nigga'];

const helplist = [
    'gif ...',
    'epadiss @...',
    'juwaini kärlek/hot/megahot @...',
    'juice/pappa/sabai/brum/pumpar/bigtime/bigtimerush/nigga/fuck/stalingrad',

]; 

function playFile (dir, message) {
    let voiceChannel = message.member.voiceChannel;
            if (voiceChannel == undefined) {
                message.channel.send('Must be in voice channel');
                break;
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
    if (message.author  == client.user) {return;}

    try {
        console.log('Message:', message.content, 'Author:', message.member.user.username);
    } catch (error) {
        console.log('Error in reading message or author');
    }

    switch(message.author.id)
    {
        case 264390450360614912:
            message.react('🇩🇪')
            break;

        case 376748559212740608:
            message.react('🇫🇮')
            break;

        case 241675681258274817:
            message.react('🤡')
            break;
    }

    //TODO: message.content.indexOf('') != -1 function

    if (message.content.indexOf('varför') != -1 || message.content.indexOf('Varför') != -1 && message.author.bot == false) {
        message.channel.send('https://media.discordapp.net/attachments/615075756434915349/707302720800948284/rip_robert.PNG')
    }

    if (message.content.indexOf(69) != -1 && message.author.bot == false) {
        message.channel.send('Nice!')
    }
    
	if (message.content.indexOf('noccocollection') != -1) {
        for (let i = 0; i < nocco.length; i++) {
            // Create the attachment using Attachment
            const attachment = new Discord.MessageAttachment(nocco[i]);
            message.channel.send(attachment)
        }
    }

	if ((message.content.indexOf(/godnatt/i) != -1 || message.content.indexOf('godnatt') != -1) && message.author.bot == false) {
        message.channel.send(`Godnatt ${message.member.user}`)
    }
	
	    if (message.content.indexOf(420) != -1 && message.author.bot == false) {
        message.channel.send('WEED!')
    }

    //TODO: GIF POST function?
    if (message.content.indexOf(';;häst;;') != -1 && message.author.bot == false) {
        giphy.search("gifs", { q: 'horse' } )
        .then( (response) => {
        
            var responseFinal = response.data[Math.floor(Math.random() * 10 + 1) % response.data.length];
            message.channel.send({files: [responseFinal.images.fixed_height.url]});
        })
        .catch( () => {
            message.channel.send(
                "ERROR: uhuh, i did a fucky wucky, sowwy :flushed: "
            );
        });
    }
	

    
for (let i = 0; i < banned_words.length; i++) {
    if (message.content.indexOf(banned_words[i]) != -1 && message.author.bot == false) {

        if (message.author.id == 241675681258274817) {
            message.author.send("DAVID!, SLUTA!")
        } else {
            message.channel.send("SLUTA!")
        }
    
        playFile('assets/reallynigga.mp3', message)
}


	
//DONT TOUCH TO MUCH ;)
	const regex = /scp [0-9]{1,4}/;
    var match = regex.exec(message.content)
    scp = `${match}`.replace('scp ', '')

    while (scp.startsWith('0')) {
        scp = scp.replace('0', '')
    }

    if (match && message.author.bot == false) {
        console.log('scp', scp)

        if (scp.length >= 3) {
            var entry = `${scp}`
        } else if (scp.length == 2) {
            var entry = `0${scp}`            
        } else if (scp.length == 1) {
            var entry = `00${scp}`
        }
		if (entry == '001' && message.author.id != 174966806606381057) {
			message.channel.send('Permission denied: O5 clearance required')
			message.channel.send('http://scp-wiki.wdfiles.com/local--files/scp-001/fractal001')
		} else {
			message.channel.send(`http://www.scp-wiki.net/scp-${entry}`)
			scp = undefined
		}
	}

    if (message.content.slice(0, 1) != prefix) {return;}

    var swchArgs = message.content.slice(1);
    if (message.content.startsWith(prefix + 'gif')) {swchArgs = 'gif';}
    if (message.content.startsWith(prefix + 'epadiss')) { swchArgs = 'epadiss'; }
    if (message.content.startsWith(prefix + 'juwaini')) { swchArgs = 'juwaini'; }
    if (message.content.startsWith(prefix + 'väder')) { swchArgs = 'väder'; }

    switch (swchArgs) {

        
        case 'help':
            for (var i of helplist) {
                message.channel.send(prefix + i);
            }

            break;
        //GIF search
        case 'gif':
            giphy.search("gifs", { q: message.content.slice(4) } )
                .then( (response) => {
                
                    var responseFinal = response.data[Math.floor(Math.random() * 10 + 1) % response.data.length];
                    message.channel.send("Here is your gif kind sir" + message.author, {files: [responseFinal.images.fixed_height.url]});
                })
                .catch( () => {
                    message.channel.send(
                        "ERROR: uhuh, i did a fucky wucky, sowwy :flushed: "
                    );
                });
                
            break;

        //Play soundfile
        case 'juice':
        case 'pappa':
        case 'sabai':
        case 'brum':
        case 'pumpar':
        case 'bigtimerush':
        case 'bigtime':
		case 'pontus':
		case'fuck':
		case 'stalingrad':
		case 'corpus':
        case 'anis':

            let dir;

            switch (swchArgs) {
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
            }	

            playFile(dir, message);

            break;

        //FUNKAR??
        //Epadiss
        case 'epadiss':
            let member2 = message.mentions.members.first();

            message.channel.send(":fire:", member2, "innehaver en epa med bristande kvalitet!", ":fire:");
            break;
        

        //Juwaini
        case 'juwaini':
            var user = message.mentions.users.first();

            if (message.content.includes("kärlek")) {
                user.send(":notes: You are my :fire: :notes:\n// Juwaini");
            } else if (message.content.includes("megahot")) {
                user.send(":baby: Jag kommer göra dig miscarriage :skull_crossbones:\n// Juwaini");
            } else if (message.content.includes("hot")) {
                user.send("Din mamma var inte tyst igår\n// Juwaini");
            }
            
            break;
        

            //FUNKAR ??
        case '§connect':
        case '§ringdalahästen':
            message.member.voiceChannel.join();
            console.log("Connected!" + message.member.voiceChannel);
            break;
        
        case '§disconnect':
            message.member.voiceChannel.leave();
            console.log("Disconected!!" + message.member.voiceChannel);
            break;
        

        case 'väder':
            
            break;
            
    }

    if (message.content.startsWith(prefix)) {
        message.delete();
    }
});

//Message Listener
client.on('error', () => {
    client.channels.get('615075756434915349').send('Robert död : ^ (')
});
client.login(token);
