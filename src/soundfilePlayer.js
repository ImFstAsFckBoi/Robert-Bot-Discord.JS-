

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

module.exports = { playFile }