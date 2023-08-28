import {CustomConfig} from "../types";
import {Client} from "discord.js";
import {CommandManager} from "./CommandManager";
import {EventManager} from "./EventManager";

export class CustomClient extends Client {
    public readonly commands = new CommandManager(this);
    public readonly events = new EventManager(this);
    public config: CustomConfig;

    constructor(config: CustomConfig) {
        super(config);
        this.config = config;
    }

    public async start() {
        await this.commands.load()
        await this.events.load()
            .then(events => {
                console.log(`Loaded ${events.length} events.`);
            });
        await this.login(this.config.token);
    }
}