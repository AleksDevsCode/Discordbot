import {ChatInputCommandInteraction, PermissionResolvable, PermissionsBitField, SlashCommandBuilder} from "discord.js";
import { Context } from "src/types";
export type CommandSettings = {
    readonly cooldown: number
    readonly botPermissions: PermissionResolvable[]
    readonly rateLimited: boolean
}

export abstract class CustomCommand {
    public abstract readonly data: SlashCommandBuilder;
    public abstract readonly settings: CommandSettings;
    protected readonly permissions = PermissionsBitField.Flags;
    protected readonly commandBuilder = new SlashCommandBuilder();

    abstract run(ctx: Context)
}