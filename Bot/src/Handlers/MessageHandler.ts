import { Message } from "whatsapp-web.js";
import { CommandManager } from "./CommandManager";
import { MentionAllCommand } from "../Commands/Mention/MentionAllCommand";

export class MessageHandler {
    private commandManager = new CommandManager();
    private mention: string = "@";
    private prefix: string = ".";

    private handleAtCommand(message: Message): void {
        const parts = message.body
            .toLowerCase()
            .replace(/\n/g, " ")
            .replace(/\r/g, " ")
            .trim()
            .split(" ");
        const atCommands = parts.filter(part => part.startsWith(this.mention)).map(part => part.substring(1));

        const containA = atCommands.find(command => command === "a");

        if (containA) {
            new MentionAllCommand(message);
            return
        }
    }

    private handleDotCommand(message: Message): void {
        const parts = message.body
            .replace(/\n/g, " ")
            .replace(/\r/g, " ")
            .trim()
            .split(" ");
        const command = parts[0].slice(1).toLowerCase();

        const commandList = this.commandManager.commandList;
        if (command in commandList) {
            commandList[command](message);
        }
    }

    public handleMessage(message: Message): void {
        if (message.body.trim().startsWith(this.prefix)) {
            this.handleDotCommand(message);
        } else if (message.body.includes(this.mention)) {
            this.handleAtCommand(message);
        }
    }
}
