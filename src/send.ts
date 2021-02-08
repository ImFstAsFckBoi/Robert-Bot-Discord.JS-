/* jshint esversion: 6 */
/* moz */

import readline from "readline";
import Discord from "discord.js";
import { exit } from "process";
const client = new Discord.Client();
const {token} = require("./config.json")

function send(_client: Discord.Client) {
  let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('ChannelID (Default = 615075756434915349) $', (answer: string) => {

    let id: string = answer == ""? "615075756434915349" : answer;

    let c = client.channels.cache.get(id);
    
    if (c == undefined) {
      throw new Error("Could not find channel")
      process.exit(1);
    } else if (!c.isText) {
      throw new Error("Channel is not TextChannel")
      process.exit(1);
    }
    
    let cTxt = c as Discord.TextChannel;

    rl.question('Message $', (answer: string) => {
      cTxt.send(`Robert says: ${answer}`).then(); 
      rl.close();
    });
  });
}



client.login(token).then(() => {send(client);});
export { send }