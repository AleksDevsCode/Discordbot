import {CustomClient} from "../../handlers/CustomClient";
import {ActivityType, Client, time} from 'discord.js';
import {CustomEvent} from "../CustomEvent";
import {connectToMongoDB} from "../../database/MongoDB";
export default class Ready extends CustomEvent {
    name = 'ready';

    async execute(bot: CustomClient, client: Client<true>) {
        await bot.commands.register();

        client.user.setPresence({
            activities: [{ name: '' , type: 4, state: 'Coding new features!' }]
        });

        console.log(`${bot.user!.username} connected`)
        await connectToMongoDB();
    }
}