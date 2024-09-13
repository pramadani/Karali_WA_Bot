import { Message } from "whatsapp-web.js";
import { italic, quote } from "../Library/text_style";

export async function ping(msg: Message) {
    const replyMessage = quote(italic('bot aktif.'));
    msg.reply(replyMessage);
}
