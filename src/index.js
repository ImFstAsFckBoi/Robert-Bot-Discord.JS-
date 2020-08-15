/* jshint esversion: 6 */
/* moz */
const Discord = require("discord.js");
const { prefix, token, giphyKey } = require("./config.json");

const fs = require('fs')
const client = new Discord.Client();
//var groovy = fs.readFileSync('./assets/groovycommands.txt')
//var grovecomms = groovy.toString().split("\n");

//GIPHY API KEY = pMRG495YskNdTPEi0yrtvWWUT8Atmb97

const GphApiClient = require("giphy-js-sdk-core");
const { exit } = require("process");
giphy = GphApiClient(giphyKey);
banned_words = ['nigger', 'nigga', 'Nigger', 'Nigga'];
const nocco = [
    'giphy.com/gifs/NOCCO-nocco-icesoda-nocarbscompany-KeWhNLD4Cq1HGa6Dph',
    'giphy.com/gifs/NOCCO-strawberry-bcaa-nocco-LOL5QdQcaFynX4TN8J',
    'giphy.com/gifs/NOCCO-peach-bcaa-noccous-huy8ZMNPSqxcWEgzvw',
    'giphy.com/gifs/NOCCO-training-bcaa-noccous-U1y2jadkDtqQfiAxIw',
    'giphy.com/gifs/NOCCO-workout-training-caffeine-7NIFnoIpx20iXUw2oK',
    'giphy.com/gifs/NOCCO-workout-training-nocco-fRau9P1NNXSykhinf9',
    'giphy.com/gifs/NOCCO-christmas-bcaa-nocco-fQrSoTrlRHOpljnxzO',
    'giphy.com/gifs/NOCCO-training-passion-nocco-1wQMiCA85tAzb4Gm8d',
    'giphy.com/gifs/NOCCO-training-caribbean-nocco-X7NFlb3b1oKvqrNguD]'
];
const helplist = [
    'gif ...',
    'epadiss @...',
    'juwaini kärlek/hot/megahot @...',
    'juice/pappa/sabai/brum/pumpar/bigtime/bigtimerush/nigga/fuck/stalingrad',

]; 

//Startup message
client.once("ready", () => {
    console.log("__BOT ONLINE!_______CTRL_+_C_=>_STOP__");
    client.channels.get('615075756434915349').send('Robert har vaknat!')
});
//Startup message

//Message Listener
client.on('message', (message) => {
    /*
    grovecomms.forEach((item, index) => {
        console.log(item)
    if (message.channel.id == 615075756434915349 && message.content.indexOf(item) != -1) {
        console.log('POGGERS!')
        setTimeout(function() {
            message.delete();
        }, 5000);
        
        
    }});
    */
    try {
        console.log('Message:', message.content, 'Author:', message.member.user.username);
    } catch (error) {
        console.log('Error in reading message or author');
    }
	if (message.author.id == 264390450360614912) {
        message.react('🇩🇪')
    }
    if (message.author.id == 376748559212740608) {
		message.react('🇫🇮')
    }   
    if (message.author.id == 241675681258274817) {
        message.react('🤡')
    }
    if (message.content.indexOf('varför') != -1 || message.content.indexOf('Varför') != -1 && message.author.bot == false) {
        message.channel.send('https://media.discordapp.net/attachments/615075756434915349/707302720800948284/rip_robert.PNG')
    }
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

	for (let i = 0; i < banned_words.length; i++) {
		if (message.content.indexOf(banned_words[i]) != -1 && message.author.bot == false) {3
		
			if (message.author.id == 241675681258274817) {
				message.author.send("DAVID!, SLUTA!")
			} else {
			
				message.channel.send("SLUTA!")
			}
			
			if (message.content.startsWith(prefix)) {
				let voiceChannel = message.member.voiceChannel;
				if (voiceChannel == undefined) {
					message.channel.send('Must be in voice channel');
					break;
				}
				
				if (voiceChannel.joinable) {
					setTimeout( () => {
						console.log("*Connecting...*" + voiceChannel);
						voiceChannel.join()
							.then(connection => {
								console.log("Connected!" + voiceChannel);
								let dispatcher = connection.playFile('assets/reallynigga.mp3');

							dispatcher.on("end", () => {
								console.log("*Disconnecting...*" + voiceChannel);
								setTimeout( () => {
									voiceChannel.leave();
								}, 1000);
							});
						}); //.catch(() => {
						//message.channel.send("ERROR: uhuh, i did a fucky wucky, sowwy :flushed: ")
						//});
					}, 1000);
				} else {
					message.channel.send("Cannot you you Voice channel!");
				}
			}
		}
	}
	

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

    if (message.author  == client.user) {return;}

    if (message.content.startsWith(prefix)) {
        message.delete();
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
        //GIF search

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

            break;
        //Play soundfile
        //Epadiss
        case 'epadiss':
            let member2 = message.mentions.members.first();

            message.channel.send(":fire:", member2, "innehaver en epa med bristande kvalitet!", ":fire:");
            break;
        //Epadiss

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

        case '§connect':
        case '§ringdalahästen':
            message.member.voiceChannel.join();
            console.log("Connected!" + message.member.voiceChannel);
            break;
        
        case '§disconnect':
            message.member.voiceChannel.leave();
            console.log("Disconected!!" + message.member.voiceChannel);
            break;
        //Juwaini

        case 'väder':
            
            break;
            
    }
});
//Message Listener
client.on('error', () => {
    client.channels.get('615075756434915349').send('Robert död : ^ (')
});
client.login(token);
