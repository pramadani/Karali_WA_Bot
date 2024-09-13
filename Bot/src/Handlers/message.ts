import { Message } from "whatsapp-web.js";
import { Commands, getCommandList } from "./command";
import { a } from "../Commands/a";

const MENTION = "@";
const PREFIX = ".";

const commandList: Commands = getCommandList();

function handleAtCommand(message: Message) {
    const parts = message.body.toLowerCase().split(" ");
    const atCommands = parts.filter(part => part.includes(MENTION));

    if (atCommands.includes("a")) a(message);
    
}

function handleDotCommand(message: Message) {
    const parts = message.body.split(" ");
    const command = parts[0].slice(1).toLowerCase();

    if (command in commandList) {
        commandList[command](message);
    }
}

export function handleMessage(message: Message) {
    if (message.body.startsWith(PREFIX)) {
        handleDotCommand(message);
        return;
    }
    
    if (message.body.includes(MENTION)) {
        handleAtCommand(message);
    }
}
