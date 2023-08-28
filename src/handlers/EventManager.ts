import FileUtil from "../utils/FileUtil";
import {CustomEvent} from "../events/CustomEvent";
import {CustomClient} from "./CustomClient";

export class EventManager {
    private readonly client: CustomClient;

    constructor(client: CustomClient) {
        this.client = client;
    }

    public async load() {
        const files = FileUtil.readdirRecursive(this.client.config.eventsPath)

        for (const file of files) {
            const Event: (new () => CustomEvent)[] = Object.values(await import(file))
            const event = new Event[0]()
            this.client.on(event.name, (args) => {
                event.execute(this.client, args)
            })
        }

        return files
    }
}