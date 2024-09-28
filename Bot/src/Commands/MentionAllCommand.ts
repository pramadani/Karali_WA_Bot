import { Client } from "whatsapp-web.js";
import { Bot } from "../Bot/Bot";
import { FormatMessage } from "../Bot/FormatMessage";
import { Command } from "./Command";

export class MentionAllCommand extends Command{

    public async exec(): Promise<void> {
        await this.getChat();
        if (!await this.checkIsGroupChat()) return;
        await this.mentionGroupChat();
    }

    private async mentionGroupChat() {
        const userId = this.msg.author!.replace("@c.us", "");
        const client: Client = Bot.clientInstance;

        let text = `\n${FormatMessage.quote(FormatMessage.italic(`Tag oleh @${userId}.`))}\n\n`;
        const mentions: string[] = [this.msg.author!];

        for (const participant of this.groupChat!.participants) {
            if (participant.id.user !== client.info.wid.user && participant.id.user !== userId) {
                mentions.push(participant.id._serialized);
                text += `@${participant.id.user} `;
            }
        }

        if (mentions.length > 1) {
            this.groupChat!.sendMessage(text, { mentions });
        }
    }
}
