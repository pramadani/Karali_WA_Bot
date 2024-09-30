import { Message } from "whatsapp-web.js";
import { PingCommand } from "../Commands/PingCommand";
import { StickerCommand } from "../Commands/StickerCommand";
import { MentionAllCommand } from "../Commands/Mention/MentionAllCommand";
import { MentionListCommand } from "../Commands/Mention/MentionList";
import { MentionCreateCommand } from "../Commands/Mention/MentionCreate";
import { MentionAddCommand } from "../Commands/Mention/MentionAdd";


const commandList: { [key: string]: (message: Message) => void } = {
    "ping": (message: Message) => new PingCommand(message),
    "sticker": (message: Message) => new StickerCommand(message),
    "a": (message: Message) => new MentionAllCommand(message),
    "mention.list": (message: Message) => new MentionListCommand(message),
    "mention.create": (message: Message) => new MentionCreateCommand(message),
    "mention.add": (message: Message) => new MentionAddCommand(message),
};


export class CommandManager {
    private commands = commandList;
    
    public get commandList() {
        return this.commands;
    }
}