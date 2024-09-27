import { Chat, Message, MessageMedia } from "whatsapp-web.js";
import { FormatMessage } from "../Bot/FormatMessage";
import { ParamParser } from "../Bot/ParamParser";
import { MessageCache } from "../MessageCache/MessageCache";
import { Command } from "./Command";

export class StickerCommand extends Command {
    private stickerName: string = '';

    public async exec() {
        if (!await this.checkHasMedia()) return;
        if (!await this.canDownloadMedia()) return;
        if (!await this.validateMediaFormat(["image", "video"])) return;

        await this.sendSticker();
    }

    private setStickerName() {
        const params = ParamParser.isIncludeParams(this.msg.body) ? ParamParser.getParams(this.msg.body) : [];
        this.stickerName = params.length > 0 ? params[0] : '';
    }

    private async sendSticker() {
        this.setStickerName();
        this.chat = await this.msg.getChat();

        this.chat.sendMessage(this.media!, {
            stickerName: this.stickerName,
            sendMediaAsSticker: true,
        });
    }
}
