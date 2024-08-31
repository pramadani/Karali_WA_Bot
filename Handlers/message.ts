import { Message } from "whatsapp-web.js";
import { Commands, getCommandList } from "./command";

const mention: string = "@";
const prefix: string = ".";

const commandList: Commands = getCommandList();

function doAtCommand(message: Message): void {
    const parts: string[] = message.body.toLowerCase().split(" ");
    const command: string[] = parts.filter(part => part.includes('@'));

    if (command.includes("a")) {
        // Handle commands that include "a"
    }
}

function doDotCommand(message: Message): void {
    const parts: string[] = message.body.split(" ");
    const command: string = parts[0].slice(1).toLowerCase();

    if (commandList.hasOwnProperty(command)) {
        commandList[command](message);
    }
}

export function handle_message(message: Message): void {
    if (message.body.includes(mention)) {
        doAtCommand(message);
        return;
    }

    if (message.body.startsWith(prefix)) {
        doDotCommand(message);
        return;
    }
}
