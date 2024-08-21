"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Handler_1 = __importDefault(require("./Handler"));
const mongoose_1 = require("mongoose");
class CustomClient extends discord_js_1.Client {
    constructor() {
        super({ intents: [discord_js_1.GatewayIntentBits.Guilds] });
        this.config = require(`${process.cwd()}/data/config.json`);
        this.handler = new Handler_1.default(this);
        this.commands = new discord_js_1.Collection();
        this.subCommands = new discord_js_1.Collection();
        this.cooldowns = new discord_js_1.Collection();
        this.developmentMode = (process.argv.slice(2).includes("--development"));
    }
    init() {
        console.log(`Starting bot in ${this.developmentMode ? "development" : "production"} mode.`);
        this.LoadHandlers();
        this.login(this.developmentMode ? this.config.token : this.config.token)
            .catch(() => console.log('error'));
        (0, mongoose_1.connect)(this.developmentMode ? this.config.devMongoUrl : this.config.mongoUrl)
            .then(() => console.log('connected to mongodb'))
            .catch((err) => console.log(err));
    }
    LoadHandlers() {
        this.handler.LoadEvents();
        this.handler.LoadCommands();
    }
}
exports.default = CustomClient;
