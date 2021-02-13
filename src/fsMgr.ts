import { IProfile, Profile } from './dataStruct';
import Discord from "discord.js"

function ls(_message: Discord.Message, type: string, _client: Discord.Client): void {
    let profiles = Profile.importAll();
    
    let msg = "";

    switch (type) {
        case "n_word":
            profiles.forEach((p) => {
                msg += (p.username + ': ' + + (' '.repeat(32 - p.username.length)) + p.n_word.toString() + '\n');
            });
            
            break;
        
        case "karma":
            profiles.forEach((p) => {
                msg +=(p.username + ': ' + (' '.repeat(32 - p.username.length)) + p.karma.toString() + '\n');
            });

            break;
        
        default:
            return;
    }
    
    _message.channel.send(msg).then();
}

function profileManip(_message: Discord.Message, type: string, value: string | number): void {
    console.log(type, ' + ('+value+')')
    
    let id = _message.author.id;
    let v: number = typeof (value) == "number" ? value : Number.parseInt(value);
    
    let result = Profile.import(id);
    let p: Profile;
   
    switch (result[1]) {
        case 0:
            p = new Profile(result[0] as IProfile);
            break;
        
        case 1:
            p = new Profile(_message.author);
            break;
        
        case 2:
            console.log("BIG ERROR");
            _message.channel.send("BIG SHIT; VERY SORRY");
            return;
            break;
        
        default:
            return;
    }

    switch (type) {
        case "n_word":
            p.n_word += v;
            break;
        
        case "karma":
            p.karma += v;
            break;
        
        default:
            return;
    }

    p.export();

    return;
}

export { ls, profileManip };