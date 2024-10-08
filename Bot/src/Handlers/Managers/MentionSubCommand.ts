import { Message } from "whatsapp-web.js";
import { Format } from "../../Commands/CommandModels/Format";
import { MentionListCommand } from "../../Commands/MentionCommand/MentionList";
import { MentionAddCommand } from "../../Commands/MentionCommand/MentionAdd";
import { Command } from "../../Commands/CommandModels/Command";
import { MentionCreateCommand } from "../../Commands/MentionCommand/MentionCreate";

export class MentionSubCommand extends Command{
    private subCommand: string[] = []
    private commands: { [key: string]: (message: Message) => void; } | undefined;

    public async exec(): Promise<void> {
        this.subCommand = Format.getSubCommand(this.message!.body);
        if (this.subCommand.length === 0) { 
            await this.notifyReply("Error. Masukkan sub command."); 
            return; 
        }
        this.setCommandList()
        await this.handle();
    }

    private setCommandList() {
        this.commands = {
            "list": (message: Message) => new MentionListCommand(message),
            "add": (message: Message) => new MentionAddCommand(message),
            "create": (message: Message) => new MentionCreateCommand(message),
        };
    }

    public async handle() {
        const command = this.subCommand[0];
        const commandList = this.commands;
        if (command in commandList!) {
            commandList![command](this.message!);
        } 
    }
}

