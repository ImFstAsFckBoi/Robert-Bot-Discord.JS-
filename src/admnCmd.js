const send = require("./send")
const readline = require('readline');
const Discord = require("discord.js");

const client = new Discord.Client();
const { token } = require("./config.json");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});





let flag = true;
let flag1 = false;
while (flag) {
    flag1 = false;

    console.log(
        "[0] Exit\n" +
        "[1] Send\n"
    );

    rl.question('> ', (answer) => { //TDO: FINISH

            switch (answer) {
                case "0":
                    flag = false;
                    break;

                case "1":
                    send.send(client);
                    break;
            }

            flag1 = true;
        rl.close();
    });

}

client.login(token).then();