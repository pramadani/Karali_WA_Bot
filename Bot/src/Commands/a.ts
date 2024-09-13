import { Chat, Client, GroupChat, Message } from "whatsapp-web.js";
import { italic, quote } from "../Library/text_style";
import { getClient } from "../Init/client";

export async function a(msg: Message) {
    const chat: Chat = await msg.getChat();

    if (!chat.isGroup) {
        await msg.reply(quote(italic('Error. Command ini hanya bisa digunakan di dalam grup.')));
        return;
    }

    const groupChat = chat as GroupChat;

    let text = '';
    let mentions: string[] = [];

    const user = msg.author;
    if (!user) {
        await msg.reply(quote(italic('User tidak ditemukan.')));
        return;
    }

    const userId = user.replace("@c.us", "");
    const client: Client = getClient();

    text += `\n${quote(italic(`Tag oleh @${userId}.`))}\n\n`;
    mentions.push(user);

    for (const participant of groupChat.participants) {
        if (participant.id.user === client.info.wid.user || participant.id.user === userId) {
            continue;
        }
        mentions.push(participant.id._serialized);
        text += `@${participant.id.user} `;
    }

    if (mentions.length > 1) {
        await groupChat.sendMessage(text, { mentions });
    }
}
