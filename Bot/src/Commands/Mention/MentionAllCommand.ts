import { Client } from "whatsapp-web.js";
import { Command } from "../Command";
import { FormatMessage } from "../../Bot/FormatMessage";
import { Bot } from "../../Bot/Bot";


export class MentionAllCommand extends Command {

    public async exec(): Promise<void> {
        await this.getChat();
        if (!await this.checkIsGroupChat()) return;
        await this.mentionGroupChat();
    }

    private async mentionGroupChat() {
        const userId = this.msg.author!.replace("@c.us", "");
        const client: Client = Bot.clientInstance;
    
        const mentions: string[] = [];
        let text = "";
    
        for (const participant of this.groupChat!.participants) {
            const participantId = participant.id.user;
            const isSelf = participantId === client.info.wid.user;
            const isUser = participantId === userId;
    
            if (!isSelf && !isUser) {
                mentions.push(participant.id._serialized);
                text += `@${participantId} `;
            }
        }
    
        if (mentions.length > 0) {
            await this.notifyReply("Melakukan tag all.");
            await this.groupChat!.sendMessage(text.trim(), { mentions });
        }
    }
    
}
