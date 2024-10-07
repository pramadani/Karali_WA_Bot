import { Message } from "whatsapp-web.js";
import { CommandManager } from "./Managers/CommandManager";
import { Format } from "../Commands/Models/Format";
import { MentionManager } from "./Managers/MentionManager";
import { Config } from "../Bot/Config";

export class MessageHandler {
    private commandManager = new CommandManager();
    private mentionManager = new MentionManager();
    private mention: string = Config.TAG_SEPARATOR;
    private prefix: string = Config.COMMAND_SEPARATOR;

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
