/* jshint esversion: 6 */

const { prefix } = require("./config.json");

import  {gifSearch} from "./gifSearchMgr";
const fsMgr = require("./fsMgr");
const soundfilePlayer = require("./soundfilePlayer");
const graph = require("./graph");

import Discord from "discord.js";
import { Profile, IProfile } from "./dataStruct";
import { Slots } from "./gamble";
import { ALL } from "dns";
import { group } from "console";

function regexTestBlock(_message: Discord.Message, _giphyClient: any, _client: Discord.Client) {
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

    if (/\$omar/i.test(_message.content) && !_message.author.bot) {
        _message.channel.send("https://www.tiktok.com/@king__omar/?\nhttps://upload.wikimedia.org/wikipedia/commons/5/5f/Ilhan_Omar%2C_official_portrait%2C_116th_Congress_%28cropped%29_A.jpg").then();
    }

    if (/vtuber[ _-]?war/i.test(_message.content) && !_message.author.bot) {
        let _ = require('./assets/data/vtuberWar.json') as string[];
        let __ = 0
        _.forEach((lnk) => {
            setTimeout(() => { _message.channel.send(lnk); }, __);
            __ += 1000
        });
    }

    if (/§gamble (slots|roulette) (\S+)/.test(_message.content) && _message.content.startsWith(prefix))
    {
        console.log("aAAa")
        let match = _message.content.match(/§gamble (slots|roulette) (\S+)/);
        console.log(match);
        
        if (match!= undefined)
        {
            console.log("bBBb")
           
            console.log("cCCc")
            switch (match[1])
            {
                case "slots":
                    Slots(_message.channel as Discord.TextChannel, new Profile(Profile.import(_message.author.id)[0] as IProfile), _client, match[2]);
                    break;
                default:
                    break;
            }
        }
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
            //Profile.printProfile(_message.channel as Discord.TextChannel, _message.author);
            
            break;

        case '§kill':
            _message.channel.send("im dead xD💀");
            
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