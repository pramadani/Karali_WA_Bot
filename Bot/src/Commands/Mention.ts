import { Chat, GroupChat, Message } from "whatsapp-web.js";
import { Format } from "../Bot/Format";
import { MentionCommand } from "./Mention/MentionCommand";
import { mentionSystem } from "./Mention/Models/MentionSystem";
import { Group } from "./Mention/Models/Group";
import { FormatMessage } from "../Bot/FormatMessage";

export class Mention extends MentionCommand{
    private tags: string[] | undefined;

    protected async do() {
        if (!this.group) return
        this.tags = Format.getTagsNonNumber(this.message.body)
        if (this.tags.length === 0) return;
        await this.mentionGroup();
    }

    private async mentionGroup() {
        const groupMentions = this.group!.getMentions();
        const tagsSet = new Set(this.tags);
        const matchingMentions = groupMentions.filter(mention => tagsSet.has(mention.name));
        if (matchingMentions.length === 0) return;
    
        const mentionsSet = new Set(
            matchingMentions.flatMap(mention => mention.getMembers().map(member => member.id))
        );

        const mentionsArray = Array.from(mentionsSet);
        const formattedText = mentionsArray.map(id => `@${id.replace("@c.us", "")}`).join(" ");

        if (mentionsArray.length === 0) return;
    
        await this.notifyReply(`Tag kepada mention terkait`)
        await this.chat?.sendMessage(formattedText, { mentions: mentionsArray });
    }
    

    protected async getGroup(): Promise<Group | undefined> {
        if (!mentionSystem.isGroupExists(this.message.from)) return undefined;
        return mentionSystem.getGroup(this.message.from)!;
    }

    protected async checkIsGroupChat(): Promise<boolean> {
        if (this.chat!.isGroup) {
            this.groupChat = this.chat as GroupChat;
            return true;
        } 
        return false;
    }
    
}