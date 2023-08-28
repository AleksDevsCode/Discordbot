import {Context} from "src/types";
import {CommandSettings, CustomCommand} from "../../CustomCommand";
import {ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder} from "discord.js";

export default class PingCommand extends CustomCommand {
    data = this.commandBuilder
        .setName('ping')
        .setDescription('Get the bots latency')
        .setDMPermission(false);

    settings: CommandSettings = {
        cooldown: 2,
        botPermissions: [],
        rateLimited: true,
    };

    async run(ctx: Context) {
        return await ctx.interaction.reply({ content: `Pong! ${ctx.client.ws.ping}ms`})
    }
}
