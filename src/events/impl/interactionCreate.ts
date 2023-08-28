import { CustomEvent } from "../CustomEvent";
import { CustomClient } from "../../handlers/CustomClient";
import { CommandInteraction, EmbedBuilder, GuildMember } from "discord.js";

class MissingPermissionsError extends Error {
    constructor(missingPermissions: string[]) {
        super();
        this.name = 'MissingPermissionsError';
        this.message = 'Bot is missing required permissions';
        this.missingPermissions = missingPermissions;
    }

    missingPermissions: string[];
}

class CooldownError extends Error {
    constructor(remainingCooldown: number) {
        super();
        this.name = 'CooldownError';
        this.message = 'Command is on cooldown';
        this.remainingCooldown = remainingCooldown;
    }

    remainingCooldown: number;
}

class RateLimitError extends Error {
    constructor(remainingRateLimit: number) {
        super();
        this.name = 'RateLimitError';
        this.message = 'User is being rate-limited';
        this.remainingRateLimit = remainingRateLimit;
    }

    remainingRateLimit: number;
}

export default class InteractionCreateEvent extends CustomEvent {
    name = 'interactionCreate';

    cooldowns: Map<string, number> = new Map();

    async execute(bot: CustomClient, ctx: CommandInteraction) {
        if (!ctx.isCommand()) return;

        const command = bot.commands.find(ctx.commandName);

        if (!command) {
            console.error(`No command matching ${ctx.commandName} was found.`);
            return;
        }

        if (!ctx.inGuild() || !(ctx.member instanceof GuildMember)) {
            const embed = new EmbedBuilder()
                .setColor('Red')
                .setDescription("Commands can only be executed in a guild!");

            return await ctx.reply({ embeds: [embed], ephemeral: true });
        }

        const now = Date.now();
        const cooldownEnd = this.cooldowns.get(command.data.name) || 0;
        if (cooldownEnd > now) {
            const remainingCooldown = Math.ceil((cooldownEnd - now) / 1000);

            const embed = new EmbedBuilder()
                .setColor('Orange')
                .setDescription(`Relax! The command is on cooldown for ${remainingCooldown}s!`);

            return await ctx.reply({ embeds: [embed] });
        }

        const cooldownSeconds = command.settings.cooldown;
        this.cooldowns.set(command.data.name, now + cooldownSeconds * 1000);

        try {
            await command.run({
                client: bot,
                guild: ctx.guild!,
                member: ctx.member,
                //@ts-ignore
                interaction: ctx,
            });
        } catch (err) {
            console.error(err);

            if (err instanceof MissingPermissionsError) {
                const missingPermissions = err.missingPermissions.join(', ');
                const embed = new EmbedBuilder()
                    .setColor('Orange')
                    .setDescription(`I'm missing the following permissions: \`${missingPermissions}\``);

                await ctx.reply({ embeds: [embed] });
            } else if (err instanceof RateLimitError) {
                const remainingRateLimit = err.remainingRateLimit;
                const embed = new EmbedBuilder()
                    .setColor('Red')
                    .setDescription(`You are being rate-limited. Commands are ignored for ${remainingRateLimit}s`);

                await ctx.reply({ embeds: [embed], ephemeral: true });
            } else {
                const embed = new EmbedBuilder()
                    .setColor('Red')
                    .setDescription("There was an unknown error while executing this command!");

                await ctx.reply({ embeds: [embed], ephemeral: true });
            }
        }
    }
}
