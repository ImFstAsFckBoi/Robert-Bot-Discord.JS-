/* jshint esversion: 6 */
/* moz */
const readline = require('readline');

function send(_client) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('INPUT> ', (answer) => {
    _client.channels.get('615075756434915349').send(`Robert says: ${answer}`)

    rl.close();
  });
}

module.exports = { send }