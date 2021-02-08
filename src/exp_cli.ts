 /*jshint esversion: 6*/

const {token} = require("./config.json");
import Discord from "discord.js";
import readline from "readline";
const client = new Discord.Client();

client.login(token).then();

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let recursiveAsyncReadLine = function () {
    rl.question('> ', function (answer) {
        if (answer === 'exit') //we need some base case, for recursion
            return rl.close(); //closing RL and returning from function.
        try {
            let data = eval(answer);
            console.log(data);
        } catch (e) {
            console.log(e);
        }
        recursiveAsyncReadLine(); //Calling this function again to ask new question
    });
};

recursiveAsyncReadLine();


