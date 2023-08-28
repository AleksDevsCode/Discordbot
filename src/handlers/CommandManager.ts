import {CustomCommand} from "../commands/CustomCommand";
import {CustomClient} from "./CustomClient";
import FileUtil from "../utils/FileUtil";

export class CommandManager {
    private client: CustomClient;
    private SLASH_COMMANDS: CustomCommand[] = [];

    constructor(client: CustomClient) {
        this.client = client;
    }

    public async load() {
        const files = FileUtil.readdirRecursive(this.client.config.commandsPath)

        for (const file of files) {
            const Command: (new () => CustomCommand)[] = Object.values(await import(file))
            const command = new Command[0]()
            this.SLASH_COMMANDS.push(command)
        }

        return this.SLASH_COMMANDS;
    }

    public find(name: string): CustomCommand | undefined {
        return this.SLASH_COMMANDS.find(cmd => cmd.data.name == name);
    }

    public async register() {
        return this.client.application?.commands.set(this.SLASH_COMMANDS.map(cmd => {
            return cmd.data.toJSON()
        }));
    }
}