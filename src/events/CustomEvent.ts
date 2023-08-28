import {CustomClient} from "../handlers/CustomClient";

export abstract class CustomEvent {
    public abstract name: string

    abstract execute(client: CustomClient, ctx: any)
}