import { Member } from "./Models/Member";
import { MentionDb } from "./Models/MentionDb";
import { MentionCommand } from "./Models/MentionCommand";
import { Format } from "../Models/Format";
import { Mention } from "./Models/Mention";

export class MentionAddCommand extends MentionCommand {

    protected async do(): Promise<void> {
        if (!await this.checkIsAdmin()) return;
        if (!await this.checkHasAnyParam()) return;
        if (!await this.checkHasTag()) return;
        await this.addMember();
    }

    private async addMember() {

        const mentionName = Format
        .removeWhiteSpace(this.params[0])
        .split(' ')[0]
        .toLowerCase()
        
        if (!this.group?.isMentionExists(mentionName)) {
            const mention = new Mention(mentionName);
            this.group!.addMention(mention)
        }

        const mention = this.group!.getMention(mentionName)

        if (this.checkHasSelfTag()) {
            const memberExists = mention!.isMemberExists(this.message.author!);
            if (!memberExists) {
                const member = new Member(this.message.author!);
                mention!.addMember(member);
                const mentionDb = new MentionDb()
                mentionDb.groupName = this.group!.name;
                mentionDb.mentionName = mention!.name;
                mentionDb.memberId = member.id;
                mentionDb.save();
            }
        }

        for (const mentionedId of this.message.mentionedIds) {
            const memberExists = mention!.isMemberExists(String(mentionedId));
            if (!memberExists) {
                const member = new Member(String(mentionedId));
                mention!.addMember(member);
                const mentionDb = new MentionDb()
                mentionDb.groupName = this.group!.name;
                mentionDb.mentionName = mention?.name;
                mentionDb.memberId = member.id;
                mentionDb.save();
            }
        }

        await this.notifyReply("Member ditambahkan.");
    }
}
