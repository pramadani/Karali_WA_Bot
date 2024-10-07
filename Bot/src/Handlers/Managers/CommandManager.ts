import { Message } from "whatsapp-web.js";
import { PingCommand } from "../../Commands/PingCommand";
import { StickerCommand } from "../../Commands/StickerCommand";
import { MentionAllCommand } from "../../Commands/MentionAllCommand";
import { Format } from "../../Commands/Models/Format";
import { MentionSubCommand } from "../SubCommandManagers/MentionSubCommand";

export class CommandManager {
    private commands: { [key: string]: (message: Message) => void } = {

        "ping": (message: Message) => new PingCommand(message),
        "sticker": (message: Message) => new StickerCommand(message),
        "a": (message: Message) => new MentionAllCommand(message),
        "mention": (message: Message) => new MentionSubCommand(message),

    };

    public async handle(message: Message) {
        const parts = Format
        .removeWhiteSpace(message.body)
        .toLowerCase()
        .split(" ");

        const command = parts[0].slice(1)
        const commandList = this.commands;
        if (command in commandList) {
            commandList[command](message);
        }
    }
}