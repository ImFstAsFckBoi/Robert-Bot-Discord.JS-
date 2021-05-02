import { exec } from "child_process";
import fs from 'fs';
import Discord from "discord.js";
function graphFunction(_message: Discord.Message, func: Function, step: string = "0.1", lowerBound: string = "0", upperBound: string = "10") {
    console.log(func, step, lowerBound, upperBound);

    exec(`python graph.py "${func.toString()}" "${step.toString()}" "${lowerBound.toString()}" "${upperBound.toString()}"`, (error, data, getter) => {
        if(error){
            console.log("error",error.message);
            return;
        }

        if(getter){
            console.log("data",data);
            return;
        }

        _message.channel.send(`func: ${func.toString()}, step: ${step.toString()}, lower and upper bound: (${lowerBound.toString()}, ${upperBound.toString()}) `, {files: ["./assets/temp/tempImg.png"]}).then();

        setTimeout(() => {
            try {
                fs.unlinkSync("./assets/temp/tempImg.png");
            } catch (error) {
                console.log(error);
            }
        }, 1000);
    });
}

export { graphFunction }