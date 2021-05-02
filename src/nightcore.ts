
import { User, TextChannel, Client, Message, MessageAttachment } from 'discord.js';
import {createWriteStream, unlinkSync} from "fs";
import { GLOBAL_CLIENT } from "./index";
import request from "request";
import { exec } from "child_process";

const allowedFormat = [
    "mp3",
    "ogg",
    "wav",
    "aiff",
    "raw",
    "8svx",
    "au",
    "snd",
    "avr",
    "cdr",
    "cvs",  
    "dat",
    "gsm",
    "hcom",
    "maud",
    "ogg",
    "ossdsp",
    "prc",
    "sf",
    "sph",
    "smp",
    "sunau",
    "txw",
    "vms",
    "voc",
    "wve",
    "ub", 
    "sb", 
    "uw",
    "sw",
    "ul",
    "al",
    "lu",
    "la",
    "sl"
]


export function mkNightcore(msg: Message): void
{
    let attachment = msg.attachments.first();
   
    if (attachment == undefined) { console.log("UNDEFINED FILE"); return; }
    if (attachment.name == null) { console.log("NULL NAME"); return; }
    
    let _ = attachment.name.split(".");
    let fmt = _.pop();

    if (fmt == undefined) { console.log("NO FOMRAT"); return; }

    let name = _.join(".");
    
    console.log(name, fmt);

    if (!allowedFormat.includes(fmt)) { console.log("UNSUPPORTED FORMAT"); return; }

    request.get(attachment.url)
        .on("error", (err) => { alert(err) })
        .pipe(createWriteStream("./assets/temp/dwnld." + fmt))
        .on("finish", () =>
        {
            exec(`sox ./assets/temp/dwnld.${fmt} ./assets/temp/${name}_nightcore.${fmt} speed 1.25`, () =>
            {
                msg.channel.send(`${name} - NIGHTCORE 🔥`, { files: [`./assets/temp/${name}_nightcore.${fmt}`] });
                
                setTimeout(() =>
                {
                    unlinkSync(`./assets/temp/${name}_nightcore.${fmt}`);
                    unlinkSync("./assets/temp/dwnld." + fmt);
                }, 1000)
            })
        });

}
