import { Chat, Message, MessageMedia } from "whatsapp-web.js";
import { italic, quote } from "../Library/text_style";
import { getMediaCache } from "../Init/media";
import { getParams, isIncludeParams } from "../Library/params";

export async function sticker(msg: Message) {
    if (!msg.hasMedia) {
        await msg.reply(quote(italic('error. tidak ada attachment.')));
        return;
    }

    const cache = getMediaCache();
    let media: MessageMedia | undefined = cache.find(item => item.key === msg.mediaKey)?.media;

    if (!media) {
        media = await msg.downloadMedia();

        if (media?.mimetype.includes("video")) {
            cache.push({ key: msg.mediaKey!, media });
        }
    }

    if (!media) {
        await msg.reply(quote(italic('error. library bug.')));
        return;
    }

    const isFormatValid = ["image", "video"].some(type => media!.mimetype.includes(type));
    if (!isFormatValid) {
        await msg.reply(quote(italic('error. format media tidak sesuai.')));
        return;
    }

    const params = isIncludeParams(msg.body) ? getParams(msg.body) : [];
    const stickerName = params.length > 0 ? params[0] : '';

    const chat: Chat = await msg.getChat();
    await chat.sendMessage(media, {
        stickerName,
        sendMediaAsSticker: true,
    });
}
