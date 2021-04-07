/*jshint esversion: 6*/

import Discord from "discord.js";

function playFile(dir: string, message: Discord.Message, vc?: Discord.VoiceChannel): void//TODO: CLEAN
{
   

    if (message.member != null &&
        message.member.voice.channel != null &&
        message.member.voice.channel.joinable)
    {
        throw new Error("VoiceChannel error")    
    }

    let _member = message.member as Discord.GuildMember;

    let _voiceChannel = vc == undefined ? _member.voice.channel as Discord.VoiceChannel: vc;

    if (_voiceChannel == undefined) {
        message.channel.send('Must be in voice channel');
        return;
    }

    
        if (_voiceChannel.joinable) {
            console.log("*Connecting...* " + _voiceChannel);
            _voiceChannel.join()
                .then((connection) => {
                    console.log("Connected!" + _voiceChannel);
                    let dispatcher = connection.play(dir);

                    dispatcher.on("end", () => {
                        console.log("*Disconnecting...*" + _voiceChannel);
                        setTimeout( () => {
                            _voiceChannel.leave();
                        }, 1000);
                    });
                })
                .catch(() => {
                    _voiceChannel.leave();
                });

            //message.channel.send("ERROR: uhuh, i did a fucky wucky, sowwy :flushed: ")
            //});
        } else {
            message.channel.send("Cannot join Voice channel!");
        }
    

}

export { playFile };