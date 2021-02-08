/* jshint esversion: 6 */
/* moz */

const Discord = require("discord.js");
const { prefix, token, giphyKey } = require("./config.json");
const client = new Discord.Client();

//GIPHY API KEY = pMRG495YskNdTPEi0yrtvWWUT8Atmb97

var GphApiClient = require("giphy-js-sdk-core");
giphy = GphApiClient(giphyKey);

errorlist = [
  "ERROR: uhuh, i did a fucky wucky, sowwy :flushed: ",
  "ERROR: sum ting wong, wi go doawn",
  "ERROR: ooopsiee, i did a bawd owo, sowwy"
];

var emojis = [
  "😀",
  "😁",
  "😂",
  "🤣",
  "😃",
  "😄",
  "😅",
  "😆",
  "😉",
  "😊",
  "😋",
  "😎",
  "😍",
  "😘",
  "😗",
  "😙",
  "😚",
  "🙂",
  "🤗",
  "🤩",
  "🤔",
  "🤨",
  "😐",
  "😑",
  "😶",
  "🙄",
  "😏",
  "😣",
  "😥",
  "😮",
  "🤐",
  "😿",
  "😾",
  "😯",
  "😫",
  "😴",
  "😌",
  "😛",
  "😜",
  "😝",
  "🤤",
  "😒",
  "😓",
  "😔",
  "😕",
  "🙃",
  "🤑",
  "😲",
  "🙁",
  "😖",
  "😞",
  "😟",
  "😤",
  "😢",
  "😭",
  "😦",
  "😧",
  "😨",
  "😩",
  "🤯",
  "😬",
  "😰",
  "😱",
  "😳",
  "🤪",
  "😵",
  "😡",
  "😠",
  "🤬",
  "😷",
  "🤒",
  "🤕",
  "🤢",
  "🤮",
  "🤧",
  "😇",
  "🤠",
  "🤡",
  "🤥",
  "🤫",
  "🤭",
  "🧐",
  "🤓",
  "😈",
  "👿",
  "👹",
  "👺",
  "💀",
  "👻",
  "👽",
  "🤖",
  "💩",
  "😺",
  "😸",
  "😹",
  "😻",
  "😼",
  "😽",
  "🙀"
];

client.once("ready", () => {
  console.log(
    "__BOT ONLINE!_______CTRL_+_C_=>_STOP__"
  );
  //client.channels.get("648563094250979328").send("جماعة الإخوان المسلمين är Paul Oggad")
});

client.on("message", message => {
  if (message.content == prefix + "help") {
    message.delete();

    var helpArray = [
      "|§gif (search)",
      "|§epadiss @(user)",
      "|§juice",
      "|§pappa",
      "|§juwaini kärlek/hot/megahot @(user) "
    ];

    for (var i = 0; i < helpArray.length; i++) {
      message.author.send(helpArray[i]);
    }
  }
});

//client.on('message', message => {
//console.log("Message:", message.member.displayName + ":", message.content).catch((err) => {
//console.log("There was an error reading a sent message")
//})
//})

//client.on('disconnect', member => {
//message.send("Welcome", member.displayName)
//})

client.on("message", message => {
  if (message.content.startsWith(`${prefix}gif `)) {
    
  }
});

client.on("message", message => {
  if (message.author == "614411925312241689") {
    client.channels.get("648593869960904736").send(message.content);
  }
});

client.on("message", message => {
  if (message.content.startsWith(`${prefix}epadiss`)) {
    let member2 = message.mentions.members.first();

    message.channel.send(
      ":fire:" +
      member2 +
      " innehaver en epa med bristande kvalitet!" +
      ":fire:"
    );
    message.delete();
  }
});

client.on("message", message => {
  if (message.content == prefix + "juice") {
    let voiceChannel = message.member.voiceChannel;
    message.delete();
    if (voiceChannel.joinable) {
      console.log("*Connecting...*" + voiceChannel);
      voiceChannel.join().then(connection => {
        console.log("Connected!" + voiceChannel);
        let dispatcher = connection.playFile("assets/juice2.mp3");

        dispatcher.on("end", end => {
          console.log("*Disconnecting...*" + voiceChannel);
          setTimeout(() => {
            voiceChannel.leave();
          }, 1000);
        });
      }); //.catch(() => {
      //message.channel.send("ERROR: uhuh, i did a fucky wucky, sowwy :flushed: ")
      //});
    } else {
      message.channel.send("Cannot you you Voice channel!");
    }
  }
});

client.on("message", message => {
  if (message.content == prefix + "brum") {
    let voiceChannel = message.member.voiceChannel;
    message.delete();
    if (voiceChannel.joinable) {
      console.log("*Connecting...*" + voiceChannel);
      voiceChannel.join().then(connection => {
        console.log("Connected!" + voiceChannel);
        let dispatcher = connection.playFile("assets/Per_anderstrom (1).mp3");

        setTimeout(() => {
          dispatcher.on("end", end => {
            console.log("*Disconnecting...*" + voiceChannel);

            voiceChannel.leave();
          }, 1000);
        });
      }); //.catch(() => {
      //message.channel.send("ERROR: uhuh, i did a fucky wucky, sowwy :flushed: ")
      //});
    } else {
      message.channel.send("Cannot you you Voice channel!");
    }
  }
});

client.on("message", message => {
  if (message.content == prefix + "pumpar") {
    let voiceChannel = message.member.voiceChannel;
    message.delete();
    if (voiceChannel.joinable) {
      console.log("*Connecting...*" + voiceChannel);
      voiceChannel.join().then(connection => {
        console.log("Connected!" + voiceChannel);
        let dispatcher = connection.playFile("assets/adrenalinenpumpar.mp3");

        setTimeout(() => {
          dispatcher.on("end", end => {
            console.log("*Disconnecting...*" + voiceChannel);
            voiceChannel.leave();
          });
        }, 1000);
      }); //.catch(() => {
      //message.channel.send("ERROR: uhuh, i did a fucky wucky, sowwy :flushed: ")
      //});
    } else {
      message.channel.send("Cannot you you Voice channel!");
    }
  }
});

client.on("message", message => {
  if (message.content == prefix + "sabai") {
    let voiceChannel = message.member.voiceChannel;
    message.delete();
    if (voiceChannel.joinable) {
      console.log("*Connecting...*" + voiceChannel);
      voiceChannel.join().then(connection => {
        console.log("Connected!" + voiceChannel);
        let dispatcher = connection.playFile("assets/Inspelning_24.mp3");

        setTimeout(() => {
          dispatcher.on("end", end => {
            console.log("*Disconnecting...*" + voiceChannel);
            voiceChannel.leave();
          });
        }, 1000);
      }); //.catch(() => {
      //message.channel.send("ERROR: uhuh, i did a fucky wucky, sowwy :flushed: ")
      //});
    } else {
      message.channel.send("Cannot you you Voice channel!");
    }
  }
});


client.on("message", message => {
  if (message.content == prefix + "pappa") {
    let voiceChannel = message.member.voiceChannel;
    message.delete();
    if (voiceChannel.joinable) {
      console.log("*Connecting...*" + voiceChannel);
      voiceChannel
        .join()
        .then(connection => {
          console.log("Connected!" + voiceChannel);
          let dispatcher = connection.playFile("assets/pappa2.mp3");

          dispatcher.on("end", end => {
            console.log("*Disconnecting...*" + voiceChannel);
            setTimeout(() => {
              voiceChannel.leave();
            }, 1000);
          });
        })
        .catch(() => {
          message.channel.send(
            "ERROR: uhuh, i did a fucky wucky, sowwy :flushed: "
          );
        });
    } else {
      message.channel.send("Cannot join your Voice channel!");
    }
  }
}); 

//client.on('message', message => {
//let randIndex = Math.floor(Math.random() * emojis.lenght)
//if (message.user == "374961489888542725") {
//message.react("😾")
//} else if (message.user == 174966806606381057) {
//message.react("🤠");
//} else if (message.user == "194842697066872832") {
//message.react("🤬")
//} else if (message.user == "241675681258274817") {
//message.react("💩")
//} else if (message.user == "241637844752400384") {
//message.react("🤮")
//} else if (message.user == "221727984044867586") {
//message.react("👺")
//} else if (message.user == "203906459367374850") {
//message.react("🤡")
//} else if (message.user == "208683782515982336") {
//message.react("😱")
//} else if (message.user == "252191692080414720") {
//message.react("😬")
//} else {
//message.react("🤠")
//}
//});

client.on("message", message => {
  if (message.content.startsWith(prefix + "juwaini")) {
    var user = message.mentions.users.first();
    message.delete();

    if (message.content.includes("kärlek")) {
      user.send(":notes: You are my :fire: :notes:\n// Juwaini");
    } else if (message.content.includes("megahot")) {
      user.send(
        ":baby: Jag kommer göra dig miscarriage :skull_crossbones:\n// Juwaini"
      );
    } else if (message.content.includes("hot")) {
      user.send("Din mamma var inte tyst igår\n// Juwaini");
    } else {
      message.author.send(
        "Du måste välja hot (:knife:) eller kärlek (:heart:) // Juwaini"
      );
    }
  }
});

client.login(token);
