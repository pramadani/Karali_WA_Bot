import { Chat, Message, MessageMedia, GroupChat } from "whatsapp-web.js";
import { FormatMessage } from "./FormatMessage";
import { messageCache } from "../../MessageCache/MessageCache";
import { Format } from "./Format";
import { Config } from "../../Bot/Config";

export abstract class Command {
    protected message: Message;
    protected chat: Chat | undefined;
    protected media: MessageMedia | undefined;
    protected groupChat: GroupChat | undefined;
    protected listMedia = messageCache.mediaMessages;
    protected params: string[] = [];
    protected selfTag: string = `@${Config.TAG_SELF}`

    constructor(msg: Message) {
        this.message = msg;
        this.params = Format.getParams(this.message.body);
        this.exec();
    }

    public abstract exec(): Promise<void> 

    protected async getChat(): Promise<void> {
        this.chat = await this.message.getChat();
    }

    protected async checkIsGroupChat(): Promise<boolean> {
        if (!this.chat) await this.getChat();
        if (this.chat!.isGroup) {
            this.groupChat = this.chat as GroupChat;
            return true;
        } 
        await this.notifyReply('Error. Command ini hanya bisa digunakan di dalam grup.');
        return false;
    }

    protected async checkIsAdmin(): Promise<boolean> {
        const authorId = this.message.author;
        const isAdmin = this.groupChat!.participants.some(participant => 
            participant.id._serialized === authorId && participant.isAdmin
        );
        if (!isAdmin) await this.notifyReply('Error. Command ini hanya bisa digunakan oleh admin grup.');
        return isAdmin;
    }

    protected async checkHasMedia(): Promise<boolean> {
        if (!this.message.hasMedia) {
            await this.notifyReply('Error. Tidak ada attachment media.');
        }
        return this.message.hasMedia;
    }

    protected async canDownloadMedia(): Promise<boolean> {
        this.media = this.listMedia.find(item => item.key === this.message.mediaKey)?.media;
        if (!this.media) {
            this.media = await this.message.downloadMedia();
            if (this.media?.mimetype.includes("video")) {
                messageCache.addMediaMessage({ key: this.message.mediaKey!, media: this.media });
            }
        }
        if (!this.media) {
            await this.notifyReply('Error. library bug.');
            return false;
        }
        return true;
    }

    protected async validateMediaFormat(validFormats: string[]): Promise<boolean> {
        const isFormatValid = validFormats.some(type => this.media!.mimetype.includes(type));
        if (!isFormatValid) {
            await this.notifyReply('Error. format media tidak sesuai.');
        }
        return isFormatValid;
    }

    protected checkHasSelfTag() {
        return Format
        .removeWhiteSpace(this.message.body)
        .split(" ")
        .includes(this.selfTag);
    }

    protected async notifyReply(text: string) {
        await this.message.reply(Format.notifyFormat(text));
    }

    protected async checkHasTag() {
        if (this.message.mentionedIds.length === 0 && !this.checkHasSelfTag()) {
            await this.notifyReply('Error. Tidak terdapat tag user.');
            return false
        }
        return true
    }

    protected async checkHasAnyParam() {
        if (!this.params || this.params.length === 0) {
            await this.notifyReply('Error. Tidak terdapat parameter tambahan.');
            return false
        }
        return true
    }
    
    protected async checkHasSpecificParam(index: number) {
        if (!this.params[index]) {
            await this.notifyReply(`Error. Tidak terdapat parameter ke-${index+1}.`);
            return false
        }
        return true
    }
}
