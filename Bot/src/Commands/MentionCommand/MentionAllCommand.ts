import { Client } from "whatsapp-web.js";
import { Bot } from "../../Bot/Bot";
import { Command } from "../CommandModels/Command";
import { Config } from "../../Bot/Config";
import { Format } from "../CommandModels/Format";

export class MentionAllCommand extends Command {

    public async exec(): Promise<void> {
        if (!await this.checkIsGroupChat()) return;
        await this.mentionGroupChat();
    }

    private async mentionGroupChat() {
        const userId = Format.removeServer(this.message.author!);
        const client: Client = Bot.clientInstance;

        let text = "";
        const mentions = this.groupChat!.participants
        .filter(participant => participant.id.user !== client.info.wid.user && participant.id.user !== userId)
        .map(participant => {
            text += `@${participant.id.user} `;
            return participant.id._serialized;
        });
    
        if (mentions.length > 0) {
            await this.notifyReply("Melakukan tag all.");
            await this.groupChat!.sendMessage(text.trim(), { mentions });
        }
    }
    
}
