import { Message } from "whatsapp-web.js";
import { italic, quote } from "../Library/text_style";

export function ping(message: Message): void {
    const replyMessage: string = quote(italic('bot aktif.'));
    
    message.reply(replyMessage);
}
