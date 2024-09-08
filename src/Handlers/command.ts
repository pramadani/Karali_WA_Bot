import { Message } from "whatsapp-web.js";
import { ping } from "../Commands/ping";

type CommandFunction = (message: Message) => void;

export interface Commands {
    [key: string]: CommandFunction;
}

const commands: Commands = {
    "ping": (message: Message) => {
        ping(message);
    },
};

export function getCommandList(): Commands {
    return commands;
}
