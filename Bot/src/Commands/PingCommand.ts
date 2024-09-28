import { FormatMessage } from "../Bot/FormatMessage";
import { Command } from "./Command";

export class PingCommand extends Command{

    public async exec() {
        const replyMessage = FormatMessage.quote(
            FormatMessage.italic('bot aktif.')
        );

        this.msg.reply(replyMessage);
    }
}
