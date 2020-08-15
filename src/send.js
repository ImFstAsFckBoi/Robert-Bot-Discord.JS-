/* jshint esversion: 6 */
/* moz */
const Discord = require("discord.js");
const readline = require('readline')
const client = new Discord.Client();
const token = 'NjQ4MTg4NzYxMTMzNTQ3NTYw.XdqnDg.O0gWCgX-wnMax1piR7ToUG8GOd0';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('INPUT> ', (answer) => {
  // TODO: Log the answer in a database
  
  client.channels.get('615075756434915349').send(`Robert says: ${answer}`)

  rl.close();
});

client.login(token);
