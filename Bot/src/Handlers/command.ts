import { Message } from "whatsapp-web.js";
import { ping } from "../Commands/ping";
import { sticker } from "../Commands/sticker";
import { a } from "../Commands/a";
import { info } from "../Commands/info";

type CommandFunction = (message: Message) => void;

export interface Commands {
    [key: string]: CommandFunction;
}

const commands: Commands = {
    ping,
    sticker,
    a,
    info,
};

export function getCommandList(): Commands {
    return commands;
}
