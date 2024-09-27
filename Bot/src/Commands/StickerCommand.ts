import { Chat, Message, MessageMedia } from "whatsapp-web.js";
import { FormatMessage } from "../Bot/FormatMessage";
import { ParamParser } from "../Bot/ParamParser";
import { MessageCache } from "../MessageCache/MessageCache";

export class StickerCommand {
    private msg: Message;
    private media: MessageMedia | undefined;
    private listMedia = MessageCache.mediaMessages
    private stickerName: string = '';
    private chat: Chat | undefined;

    constructor(msg: Message) {
        this.msg = msg;
        this.exec();
    }

    public async exec() {
        if (await this.checkForMedia()) {
            return;
        }

        if (await this.downloadMedia()) {
            return;
        }

        if (await this.validateMediaFormat()) {
            return;
        }

        await this.sendSticker();
    }

    private async checkForMedia(): Promise<boolean> {
        if (!this.msg.hasMedia) {
            await this.msg.reply(
                FormatMessage.quote(
                    FormatMessage.italic('error. tidak ada attachment.')
                )
            );
            return true;
        }
        return false;
    }

    private async downloadMedia(): Promise<boolean> {
        this.media = this.listMedia.find(item => item.key === this.msg.mediaKey)?.media;

        if (!this.media) {
            this.media = await this.msg.downloadMedia();

            if (this.media?.mimetype.includes("video")) {
                MessageCache.addMediaMessage({ key: this.msg.mediaKey!, media: this.media });
            }
        }

        if (!this.media) {
            await this.msg.reply(
                FormatMessage.quote(
                    FormatMessage.italic('error. library bug.')
                )
            );
            return true;
        }
        return false;
    }

    private async validateMediaFormat(): Promise<boolean> {
        const isFormatValid = ["image", "video"].some(type => this.media!.mimetype.includes(type));
        if (!isFormatValid) {
            await this.msg.reply(
                FormatMessage.quote(
                    FormatMessage.italic('error. format media tidak sesuai.')
                )
            );
            return true;
        }
        return false;
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
