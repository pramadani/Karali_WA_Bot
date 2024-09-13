import { Message } from "whatsapp-web.js"
import { italic, monospace, quote } from "../Library/text_style"

export async function info(msg: Message) {
    if (msg.hasQuotedMsg === false) {
        await msg.reply(quote(italic('error. reply pesan yang diinginkan.')))
        return
    }
    
    const quoted_msg = await msg.getQuotedMessage();
    const quotedMsgString = JSON.stringify(quoted_msg, null, 2);
    msg.reply(monospace(quotedMsgString));
}
