/* jshint esversion: 6 */
/* moz */
const readline = require('readline');
const Discord = require("discord.js");
const client = new Discord.Client();
const { token } = require("./config.json");

function send(_client) {
  let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('INPUT> ', (answer) => {
    _client.channels.get('615075756434915349').send(`Robert says: ${answer}`).then();

    rl.close();
  });
}

send(client)

client.login(token).then();
module.exports = { send }