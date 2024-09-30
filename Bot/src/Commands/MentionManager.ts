import { Message } from "whatsapp-web.js";
import { Format } from "../Bot/Format";
import { MentionAllCommand } from "./Mention/MentionAllCommand";
import { Mention } from "./Mention";

export class MentionManager {

    public handle(message: Message): void {
        const parts = Format
        .removeWhiteSpace(message.body)
        .toLowerCase()
        .split(" ");

        const atCommands = parts
        .filter(part => part.startsWith("@"))
        .map(part => part.substring(1))

        const containA = atCommands.find(command => command === "a");
        if (containA) {
            new MentionAllCommand(message);
            return
        }
        if (atCommands.length > 0) {
            new Mention(message);
            return
        }
    }
}