/* jshint esversion: 6 */

const { prefix } = require("./config.json");

import  {gifSearch} from "./gifSearchMgr";
const fsMgr = require("./fsMgr");
const soundfilePlayer = require("./soundfilePlayer");
const graph = require("./graph");

import Discord from "discord.js";

function regexTestBlock(_message: Discord.Message, _giphyClient: any) {
    if (/varför/i.test(_message.content) && !_message.author.bot) {
        _message.channel.send('https://media.discordapp.net/attachments/615075756434915349/707302720800948284/rip_robert.PNG').then();
    }

    if (/69/i.test(_message.content) && !_message.author.bot) {
        _message.channel.send('Nice!').then();
    }

    if (/godnatt/i.test(_message.content) && !_message.author.bot) {
        _message.channel.send(`Godnatt ${_message.author}`).then();
    }

    if (/420/i.test(_message.content) && !_message.author.bot) {
        _message.channel.send('WEED!').then();
    }

    if (/;;häst;;/.test(_message.content) && !_message.author.bot) {
        gifSearch("Horse", _message, _giphyClient);
    }

    if (/disclaimer/.test(_message.content) && !_message.author.bot) {
        _message.channel.send("https://images-ext-1.discordapp.net/external/9wvdoyYOWGK7YHVhT7dpb-iWMRCleJ1qDCTujbyjRIE/https/media.discordapp.net/attachments/615075756434915349/755022937387433995/gif_2.gif").then();
    }

    if (/queer/.test(_message.content) && !_message.author.bot) {
        _message.channel.send("Queer är en slur!").then();
    }
}

function prefixSwitch(_message: Discord.Message, _client: Discord.Client, _giphyClient: any) {
    let switchArgs = _message.content.slice(1);

    if (_message.content.startsWith(prefix + 'gif')) {switchArgs = 'gif';}
    else if (_message.content.startsWith(prefix + 'epadiss')) { switchArgs = 'epadiss'; }
    else if (_message.content.startsWith(prefix + 'juwaini')) { switchArgs = 'juwaini'; }
    else if (_message.content.startsWith(prefix + prefix + 'kill')) {switchArgs = '§kill'; }
    else if (_message.content.startsWith(prefix + 'ls')) {switchArgs = 'ls'; }
    else if (_message.content.startsWith(prefix + 'graph')) {switchArgs = 'graph'; }


    switch (switchArgs) {
        //GIF search
        case 'gif':
            gifSearch(_message.content.slice(4), _message, _giphyClient);

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
                    dir = 'assets/soundfiles/Per_anderstrom (1).mp3';
                    break;
                case 'pumpar':
                    dir = 'assets/soundfiles/adrenalinenpumpar.mp3';
                    break;
                case 'bigtimerush':
                    dir = 'assets/soundfiles/bigtime.m4a';
                    break;
                case 'bigtime':
                    dir = 'assets/soundfiles/bigtime.mp3';
                    break;
                case 'pontus':
                    dir = 'assets/soundfiles/pontus.mp3';
                    break;
                case 'fuck':
                    dir = 'assets/soundfiles/Fuck_no_baby_vine-[AudioTrimmer.com].mp3';
                    break;
                case 'stalingrad':
                    dir = 'assets/soundfiles/stalingrad.mp3';
                    break;
                case 'corpus':
                    dir = 'assets/soundfiles/corpus.mp3';
                    break;
                case 'anis':
                    dir = 'assets/soundfiles/anis.mp3';  
                    break;
                default:
                    break;
            }

            if (dir) {
                soundfilePlayer.playFile(dir, _message);
            }

            break;

        case 'prank':
            //console.log(message.author.voiceChannel + typeof(message.author.voiceChannel))
            soundfilePlayer.playFile('assets/bigtime.mp3', _message, _client.channels.cache.get('743070954900553871'));
            break;

        case "ls":
            if (/nw/i.test(_message.content)) {
                fsMgr.ls(_message, "n-word", _client);
            } else if (/krma/i.test(_message.content)) {
                fsMgr.ls(_message, "karma", _client);
            }

            break;

        case "graph":
            let args = _message.content.split(",");

            graph.graphFunction(_message, args[0].slice(6), args[1], args[2], args[3]);

            break;
    }

    switch(switchArgs) {
        case '§connect':
            break;
        case '§ringdalahästen':
            try {
                if (_message.member != null &&
                    _message.member.voice.channel != null &&
                    _message.member.voice.channel.joinable) {
                    _message.member.voice.channel.join();
                    console.log("Connected!" + _message.member.voice.channel.name);
                }

                break;
            } catch (TypeError) {
                console.log("channel undefined");
            }

            break;

        case "§upvote":
            _message.react("708416577787396097").then();
            break;

        case "§downvote":
            _message.react("696804691039748157").then();
            break;

        case '§disconnect':
            if (_message.member != null &&
                _message.member.voice.channel != null &&
                _message.member.voice.channel.joinable)
            {    
                _message.member.voice.channel.leave();
                console.log("Disconected!!" + _message.member.voice.channel.name);
            }
           
            break;

        case '§test': //x**2 - ((cos (x - 1)**0.5) - e**2 * (pi - 3))", "0.05
            break;

        case '§kill':
            let code = _message.content.slice(7);
            console.log("EXIT WITH CODE:", code);
            _message.delete().then();
            process.exit(parseInt(code));
            break;
    }

    if(_message.author.id.toString() === "174966806606381057" || true) {
    }
    if (_message.content.startsWith(prefix)) {
        _message.delete().then();
    }
}

export { regexTestBlock, prefixSwitch };