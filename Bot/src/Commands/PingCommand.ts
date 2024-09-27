import { Message } from "whatsapp-web.js";
import { FormatMessage } from "../Bot/FormatMessage";

export class PingCommand {
    private msg: Message;

    constructor(msg: Message) {
        this.msg = msg;
        this.exec();
    }

    public async exec() {
        const replyMessage = FormatMessage.quote(
            FormatMessage.italic('bot aktif.')
        );
        
        this.msg.reply(replyMessage);
    }
}
