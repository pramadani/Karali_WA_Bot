import { Message } from "whatsapp-web.js";
import { Format } from "../../Commands/CommandModels/Format";
import { MentionAllCommand } from "../../Commands/MentionCommand/MentionAllCommand";
import { MentionCustomCommand } from "../../Commands/MentionCommand/MentionCustomCommand";
import { Config } from "../../Bot/Config";

export class MentionManager {

    public handle(message: Message): void {
        const parts = Format
        .removeWhiteSpace(message.body)
        .toLowerCase()
        .split(" ");

        const atCommands = parts
        .filter(part => part.startsWith(Config.TAG_SEPARATOR))
        .map(part => part.substring(1))

        const containA = atCommands.find(command => command === Config.TAG_ALL);
        if (containA) {
            new MentionAllCommand(message);
            return
        }
        if (atCommands.length > 0) {
            new MentionCustomCommand(message);
            return
        }
    }
}