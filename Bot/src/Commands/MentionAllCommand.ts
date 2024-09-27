import { Chat, Client, GroupChat, Message } from "whatsapp-web.js";
import { Bot } from "../Bot/Bot";
import { FormatMessage } from "../Bot/FormatMessage";

export class MentionAllCommand {
    private msg: Message;
    private chat: Chat | undefined;
    private groupChat: GroupChat | undefined;

    constructor(msg: Message) {
        this.msg = msg;
        this.exec();
    }

    public async exec(): Promise<void> {
        await this.initializeChat();

        if (!this.isGroupChat()) {
            await this.replyChatError();
            return
        } 
        
        await this.mentionGroupChat();
    }

    private async initializeChat(): Promise<void> {
        this.chat = await this.msg.getChat();
        if (this.chat.isGroup) {
            this.groupChat = this.chat as GroupChat;
        }
    }

    private isGroupChat(): boolean {
        return this.groupChat !== undefined;
    }

    private async replyChatError(): Promise<void> {
        await this.msg.reply(
            FormatMessage.quote(
                FormatMessage.italic('Error. Command ini hanya bisa digunakan di dalam grup.')
            )
        );
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
