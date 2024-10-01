import { Message } from "whatsapp-web.js";
import { CommandManager } from "./CommandManager";
import { MentionAllCommand } from "../Commands/Mention/MentionAllCommand";
import { Format } from "../Bot/Format";
import { MentionManager } from "./MentionManager";

export class MessageHandler {
    private commandManager = new CommandManager();
    private mentionManager = new MentionManager();
    private mention: string = "@";
    private prefix: string = ".";

    public handleMessage(message: Message): void {
        const isAtCommand = Format
        .removeWhiteSpace(message.body)
        .includes(this.mention)

        const isDotCommand = Format
        .removeWhiteSpace(message.body)
        .startsWith(this.prefix)

        if (isDotCommand) {
            this.commandManager.handle(message);
            return
        } 

        if (isAtCommand) {
            this.mentionManager.handle(message);
            return
        }
    }
}
