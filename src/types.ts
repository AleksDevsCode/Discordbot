import {ClientOptions, Guild, GuildMember, ChatInputCommandInteraction} from "discord.js";
import { CustomClient } from "./handlers/CustomClient";

export type CustomConfig = {
    token: string,
    mongoUri: string,
    debug: boolean,
    commandsPath: string,
    eventsPath: string
} & ClientOptions

export type Context = {
    client: CustomClient;
    guild: Guild;
    member: GuildMember;
    interaction: ChatInputCommandInteraction;
}