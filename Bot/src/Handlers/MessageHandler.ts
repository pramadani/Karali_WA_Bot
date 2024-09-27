import { Message } from "whatsapp-web.js";
import { CommandManager } from "./CommandManager";
import { MentionAllCommand } from "../Commands/MentionAllCommand";

export class MessageHandler {
    private commandManager = new CommandManager();
    private mention: string = "@";
    private prefix: string = ".";

    private handleAtCommand(message: Message): void {
        const parts = message.body.toLowerCase().split(" ");
        const atCommands = parts.filter(part => part.includes(this.mention)).map(part => part.substring(1));

        const containA = atCommands.find(command => command === "a");

        if (containA) {
            new MentionAllCommand(message);
            return
        }
    }

    private handleDotCommand(message: Message): void {
        const parts = message.body.split(" ");
        const command = parts[0].slice(1).toLowerCase();

        const commandList = this.commandManager.commandList;
        if (command in commandList) {
            commandList[command](message);
        }
    }

    public handleMessage(message: Message): void {
        if (message.body.startsWith(this.prefix)) {
            this.handleDotCommand(message);
        } else if (message.body.includes(this.mention)) {
            this.handleAtCommand(message);
        }
    }
}
