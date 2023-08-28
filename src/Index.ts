import {IntentsBitField} from 'discord.js';
import dotenv from 'dotenv';
import {CustomClient} from "./handlers/CustomClient";
import {realpathSync} from "fs";

dotenv.config();

const token = process.env.DISCORD_TOKEN;
const mongoUri = process.env.MONGO_URI;

const start = Date.now();

if (!token) {
    throw new Error('No token provided.');
}

if (!mongoUri) {
    throw new Error('No mongo uri provided.');
}

const client = new CustomClient({
    token: token,
    mongoUri: mongoUri,
    commandsPath: realpathSync('./src/commands/impl'),
    eventsPath: realpathSync('./src/events/impl'),
    debug: process.env.DEBUG === 'TRUE',
    intents: [IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildPresences,
        IntentsBitField.Flags.GuildMessageReactions,
        IntentsBitField.Flags.DirectMessages,
    IntentsBitField.Flags.Guilds],
});

client.start().then(() => {
    const end = Date.now() - start;
    console.log(`Bot is now cool. Took ${end}ms`);
})