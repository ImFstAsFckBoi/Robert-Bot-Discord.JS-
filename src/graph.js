const { exec } = require("child_process");
const fs = require('fs');

function graphFunction(_message, func, step = "0.1", lowerBound = "0", upperBound = "10") {
    console.log(func, step, lowerBound, upperBound)

    exec(`python graph.py "${func.toString()}" "${step.toString()}" "${lowerBound.toString()}" "${upperBound.toString()}"`, (error, data, getter) => {
        if(error){
            console.log("error",error.message);
            return;
        }
        if(getter){
            console.log("data",data);
            return;
        }

        _message.channel.send(`func: ${func.toString()}, step: ${step.toString()}, lower and upper bound: (${lowerBound.toString()}, ${upperBound.toString()}) `, {files: ["./graphTemp/tempImg.png"]}).then();

        setTimeout( () => {
            try {
                fs.unlinkSync("./graphTemp/tempImg.png");
            } catch (error) {
                console.log(error);
            }
        }, 1000);

    });
}

module.exports = { graphFunction }