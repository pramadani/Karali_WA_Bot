import { Member } from "./Models/Member";
import { MentionDb } from "./Models/MentionDb";
import { MentionCommand } from "./Models/MentionCommand";
import { Format } from "../CommandModels/Format";
import { Mention } from "./Models/Mention";

export class MentionCreateCommand extends MentionCommand {

    protected async do(): Promise<void> {
        if (!await this.checkIsAdmin()) return;
        if (!await this.checkHasAnyParam()) return;
        await this.addMention();
    }

    private async addMention() {

        const mentionName = Format
        .removeWhiteSpace(this.params[0])
        .split(' ')[0]
        .toLowerCase()
        
        if (this.group?.isMentionExists(mentionName)) {
            this.notifyReply("Error. Mention sudah ada.")
        }

        const mention = new Mention(mentionName)
        this.group!.addMention(mention)

        const mentionDb = new MentionDb()
        mentionDb.groupName = this.group!.name;
        mentionDb.mentionName = mention?.name;
        mentionDb.save();

        await this.notifyReply("Mention ditambahkan.");
    }
}
