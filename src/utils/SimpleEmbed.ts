import {EmbedBuilder} from "discord.js";

export async function simpleEmbed(color: string, description: string) {
    // @ts-ignore
    return new EmbedBuilder()
        //@ts-ignore
        .setColor(color)
        .setDescription(description)
}