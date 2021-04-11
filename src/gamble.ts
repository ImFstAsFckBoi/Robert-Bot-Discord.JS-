import {Profile, IProfile} from "./dataStruct";
import {TextChannel, Client, GuildEmoji} from "discord.js"
import { exception } from "console";
export function Slots(channel: TextChannel, user: Profile,  client: Client, arg: string = "")
{
    let betnum: number;
    let prevkarm = user.karma;
   
    if (!/^[0-9]+$/.test(arg))
    {
        switch (arg.toLowerCase())
        {            
            case "all":
                betnum = user.karma;
                console.log("a")
                break;
            
            case "half":
                betnum = user.karma / 2;
                console.log("b")
                break;
            
            default:
                betnum = 0
                console.log("c")
                break;
                
        }
    }
    else 
    {
        betnum = parseInt(arg, 10);
    }
    
    if (betnum > user.karma || betnum <= 0)
    {
        channel.send("You aint got dat much retar " + "u have " + user.karma);
        return;
    }
    

    console.log(betnum)
    channel.send("slots for " + betnum + " karma")
    user.karma -= betnum;

    let a = 9;
    let emoji: GuildEmoji[] = [];
    for (let i = 0; i < a; i++)
    {
        emoji[i] = client.emojis.cache.random()
    }


    let first = Math.floor(Math.random() * 3);
    let second = Math.floor(Math.random() * 3);
    let thrid = Math.floor(Math.random() * 3);
    
    let msg = (emoji[first].toString() + " " + emoji[second].toString() + " " + emoji[thrid].toString());

    if (emoji[first].id == emoji[second].id && emoji[first].id == emoji[thrid].id)
    {
        user.karma += betnum + Math.round(betnum * 2);
        
        
    }
    else if (emoji[first].id == emoji[second].id || emoji[second].id == emoji[thrid].id)
    {
        user.karma += betnum + Math.round(betnum * 1.5);
        
    }
    else    
    {
        
    }
    
    
    channel.send(msg);
    channel.send(((user.karma - prevkarm) <= 0? "" : "+" ) + (user.karma - prevkarm).toString() + ", u have " + user.karma.toString() + " karma")
    user.export();
}