import {User, TextChannel} from 'discord.js';
import {readFile, writeFile} from "fs";
import faunadb from "faunadb";
import { rejects } from 'assert';
const { faunaKey } = require("./config.json");
const faunaClient = new faunadb.Client({ secret: faunaKey })

const {
    Ref,
    Paginate,
    Get,
    Select,
    Match,
    Index,
    Create,
    Collection,
    Lambda,
    Var,
    Join,
    Update,
    Map,
    Documents
} = faunadb.query;

/*
Create(
  Ref(
    Collection("RobertDB"),
    "174966806606381057"
    ), 
  {
    data: {
      id: "174966806606381057",
      tag: "#2157",
      username: "///////////////////////////",
      name_history: [],
      karma: 0,
      n_word: 3,
      n_word_pass: true
    }
  }
)
*/

export interface IProfile {
    
        id: string,
        tag: string,
        username: string,
        name_history: string[],
        karma: number,
        n_word: number,
        n_word_pass: boolean
}

interface IProfileDocument
{
    ref: any,
    ts: number,
    data: IProfile
}
export class Profile implements IProfile {
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

    private updateUsername(newName: string): void {
        this.name_history.push(this.username);
        this.username = newName;
    }

    async export(path: string = "./assets/data/userDB.json"): Promise<void> {
        let usr = {
            "id": this.id,
            "tag": this.tag,
            "username": this.username,
            "name_history": this.name_history,
            "karma": this.karma,
            "n_word": this.n_word,
            "n_word_pass": this.n_word_pass
        }
        
        let res = await faunaClient.query(
            Update(
                Ref(
                    Collection("RobertDB"),
                    this.id
                ),
                {
                    data: this as IProfile
                }
            )
        )
        .catch((err) =>
        {
            console.log(err)
        });

        if (res == undefined)
        {
            let _res = await faunaClient.query(
                Create(
                    Ref(
                        Collection("RobertDB"),
                        this.id
                    ),
                    {
                        data: this as IProfile
                    }
                )
            )
            .catch((_err) =>
            {
                console.log(_err);
            });
            
            console.log(_res);
            return;
        }
        

        console.log(res);
    }

    private static getTag(user: User): string {
        return '#' + user.tag.split('#')[1];
    }
    
    static async import(id: string): Promise<void> //Promise<[value: IProfile | null, success: number]>
    {
        let doc = await faunaClient.query(
            Get(
                Ref(
                    Collection(
                        "RobertDB"
                    ),
                    id
                )
            ) 
        ).catch(() =>
        {
            
        })
        

        console.log(doc);
    }

    static async importAll(path: string = "./assets/data/userDB.json"): Promise<IProfile[]> {
        let docs:any = faunaClient.query(
            Map(
                Paginate(Documents(Collection("RobertDB"))),
                Lambda(x => Get(x))
              )
        ) 
        
        let out: IProfile[];

        docs.forEach((i: IProfileDocument) => {
            out.push(i.data);
        });
        
       
    }

    printProfile(channel: TextChannel): void {
        Profile.printProfile(channel, this);
    }

    static printProfile(channel: TextChannel, user: Profile | User): void {
        let u: Profile;
        if (user instanceof User) {
            u = new Profile(Profile.import(user.id)[0] as IProfile);
        } else {
            u = user;
        }

        let msg = `USER: ${u.username} ${u.tag}\n     ID: ${u.id}\n\nKARMA: ${u.karma}\nN-Word: ${u.n_word}\nID: ${u.n_word_pass ? "Yes" : "NO"}\n`;
        channel.send(msg);
    }
}

