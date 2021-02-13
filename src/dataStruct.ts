import {User} from 'discord.js';
import {readFile, writeFile} from "fs";



export interface IProfile {
    
        id: string,
        tag: string,
        username: string,
        name_history: string[],
        karma: number,
        n_word: number,
        n_word_pass: boolean
}

export class Profile {
    id: string;
    tag: string;
    username: string;
    name_history: string[];
    karma: number;
    n_word: number;
    n_word_pass: boolean;
    constructor(user: User | IProfile) {
        this.id = user.id;
        this.tag = user instanceof User ? Profile.getTag(user) : user.tag;
        this.username = user.username;
        this.name_history = user instanceof User ? [] : user.name_history
        this.karma = user instanceof User ? 0 : user.karma;
        this.n_word = user instanceof User ? 0 : user.n_word;
        this.n_word_pass = user instanceof User ? false : user.n_word_pass;
    }
    update(user: User) {
        if (user.username != this.username) this.updateUsername(user.username);
        if (Profile.getTag(user) != this.tag) this.tag = Profile.getTag(user);

        this.export()
    }

    updateUsername(newName: string): void {
        this.name_history.push(this.username);
        this.username = newName;
    }

    export(path: string = "./assets/data/userDB.json"): void {
        let usr = {
            "id": this.id,
            "tag": this.tag,
            "username": this.username,
            "name_history": this.name_history,
            "karma": this.karma,
            "n_word": this.n_word,
            "n_word_pass": this.n_word_pass
        }
        
        
        let json = Profile.importAll();
        let i = json.findIndex((p) => {return p.id == this.id});
        if (i == -1) {
            json.push(usr);
        } else {
            json[i] = usr;
        }
        
        writeFile(path, JSON.stringify(json, null, 4), (_err) => {
            if (_err) {
                console.log(_err)
            }
        });
        
    }

    static getTag(user: User): string {
        return '#' + user.tag.split('#')[1];
    }
    
    static import(id: string, path: string = "./assets/data/userDB.json"): [value: IProfile | null, success: number]
    {
        try {
            let profiles = Profile.importAll()
            
            let profile = profiles.find((p) => { return p.id == id });

            if (profile == undefined) {
                return [null, 1]
            } else {
                return [profile, 0]
            }

        } catch (err) {
            console.log(err)
            return [null, 2]
        }
    }

    static importAll(path: string = "./assets/data/userDB.json"): IProfile[] {
        return require(path) as IProfile[];
    }
}
