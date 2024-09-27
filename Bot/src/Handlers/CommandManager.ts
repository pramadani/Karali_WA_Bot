import { Message } from "whatsapp-web.js";
import { PingCommand } from "../Commands/PingCommand";
import { StickerCommand } from "../Commands/StickerCommand";
import { MentionAllCommand } from "../Commands/MentionAllCommand";

const commandList: { [key: string]: (message: Message) => void } = {
    "ping": (message: Message) => new PingCommand(message),
    "sticker": (message: Message) => new StickerCommand(message),
    "a": (message: Message) => new MentionAllCommand(message),
};


export class CommandManager {
    private commands = commandList;
    
    public get commandList() {
        return this.commands;
    }
}