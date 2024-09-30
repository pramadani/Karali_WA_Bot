import { Chat, Message, MessageMedia, GroupChat } from "whatsapp-web.js";
import { FormatMessage } from "../Bot/FormatMessage";
import { MessageCache } from "../MessageCache/MessageCache";
import { ParamParser } from "../Bot/ParamParser";
import { Bot } from "../Bot/Bot";

export abstract class Command {
    protected msg: Message;
    protected chat: Chat | undefined;
    protected media: MessageMedia | undefined;
    protected groupChat: GroupChat | undefined;
    protected listMedia = MessageCache.mediaMessages;
    protected params: string[] = [];

    constructor(msg: Message) {
        this.msg = msg;
        this.params = ParamParser.isIncludeParams(this.msg.body.trim()) ? ParamParser.getParams(this.msg.body.trim()) : [];
        this.exec();
    }

    public abstract exec(): Promise<void> 

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

    protected async checkIsAdmin(): Promise<boolean> {
        const authorId = this.msg.author;
    
        const isAdmin = this.groupChat!.participants.some(participant => 
            participant.id._serialized === authorId && participant.isAdmin
        );
    
        if (!isAdmin) {
            await this.msg.reply(
                FormatMessage.quote(
                    FormatMessage.italic('Error. Command ini hanya bisa digunakan oleh admin grup.')
                )
            );
        }
    
        return isAdmin;
    }
    

    protected async checkHasMedia(): Promise<boolean> {
        if (!this.msg.hasMedia) {
            await this.msg.reply(
                FormatMessage.quote(
                    FormatMessage.italic('Error. tidak ada attachment media.')
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
            await this.msg.reply(
                FormatMessage.quote(
                    FormatMessage.italic('Error. format media tidak sesuai.')
                )
            );
            return false;
        }
        return true;
    }

    protected checkHasSelfTag() {
        const hasSelfTag = this.msg.body
            .replace(/\n/g, " ")
            .replace(/\r/g, " ")
            .trim()
            .split(" ")
            .map(word => word.trim())
            .includes('@me');
        return hasSelfTag;
    }

    protected async notifyReply(text: string) {
        await this.msg.reply(
            FormatMessage.quote(
                FormatMessage.italic(text)
            )
        );
    }

    protected async notify(chatId: string, text: string) {
        await Bot.clientInstance.sendMessage(
            chatId,
            FormatMessage.quote(
                FormatMessage.italic(text)
            )
        );
    }
}
