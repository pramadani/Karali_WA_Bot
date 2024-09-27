import { Chat, Message, MessageMedia, GroupChat } from "whatsapp-web.js";
import { FormatMessage } from "../Bot/FormatMessage";
import { MessageCache } from "../MessageCache/MessageCache";

export class Command {
    protected msg: Message;
    protected chat: Chat | undefined;
    protected media: MessageMedia | undefined;
    protected groupChat: GroupChat | undefined;
    protected listMedia = MessageCache.mediaMessages;

    constructor(msg: Message) {
        this.msg = msg;
        this.exec();
    }

    public async exec(): Promise<void> {
        // Placeholder method - should be overridden by child classes
    }

    protected async getChat(): Promise<void> {
        this.chat = await this.msg.getChat();
    }

    protected async checkIsGroupChat(): Promise<boolean> {
        if (this.chat && this.chat.isGroup) {
            this.groupChat = this.chat as GroupChat;
            return true;
        } 

        await this.msg.reply(
            FormatMessage.quote(
                FormatMessage.italic('Error. Command ini hanya bisa digunakan di dalam grup.')
            )
        );
        return false;
    }

    protected async checkHasMedia(): Promise<boolean> {
        if (!this.msg.hasMedia) {
            await this.msg.reply(
                FormatMessage.quote(
                    FormatMessage.italic('Error. tidak ada attachment.')
                )
            );
            return false;
        }

        return true;
    }

    protected async canDownloadMedia(): Promise<boolean> {
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
                    FormatMessage.italic('Error. library bug.')
                )
            );
            return false;
        }
        return true;
    }

    protected async validateMediaFormat(validFormats: string[]): Promise<boolean> {
        const isFormatValid = validFormats.some(type => this.media!.mimetype.includes(type));
        if (!isFormatValid) {
            this.msg.reply(
                FormatMessage.quote(
                    FormatMessage.italic('Error. format media tidak sesuai.')
                )
            );
            return false;
        }
        return true;
    }
}
