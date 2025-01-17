import { Client, Collection, GatewayIntentBits } from "discord.js";
import ICustomClient from "../interfaces/ICustomClients";
import IConfig from "../interfaces/IConfig";
import Handler from "./Handler";
import Command from "./Command";
import SubCommand from "./SubCommand";
import { connect } from "mongoose";

export default class CustomClient extends Client implements ICustomClient{
    handler: Handler;
    config: IConfig;
    commands: Collection<string, Command>;
    subCommands: Collection<string, SubCommand>;
    cooldowns: Collection<string, Collection<string, number>>;
    developmentMode: boolean;

    constructor() {
        super({ intents: [GatewayIntentBits.Guilds]})

        this.config = require(`${process.cwd()}/data/config.json`)
        this.handler = new Handler(this);
        this.commands = new Collection();
        this.subCommands = new Collection();
        this.cooldowns = new Collection();
        this.developmentMode = (process.argv.slice(2).includes("--development"));
    }
    
    init(): void {
        console.log(`Starting bot in ${this.developmentMode ? "development" : "production"} mode.`)
        this.LoadHandlers()
        
        this.login(this.developmentMode ? this.config.token : this.config.token)
            .catch(() => console.log('error'))

        connect(this.developmentMode ? this.config.devMongoUrl : this.config.mongoUrl)
            .then(() => console.log('connected to mongodb'))
            .catch((err) => console.log(err))
    }
    
    LoadHandlers(): void {
        this.handler.LoadEvents();
        this.handler.LoadCommands();
    }
}