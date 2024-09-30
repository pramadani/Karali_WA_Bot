import { Format } from "../../Bot/Format";
import { MentionCommand } from "./MentionCommand";
import { Mention } from "./Models/Mention";
import { MentionDb } from "./Models/MentionDb";

export class MentionCreateCommand extends MentionCommand {

    protected async do(): Promise<void> {
        if (!await this.checkIsAdmin()) return;
        if (!await this.checkHasAnyParam()) return;
        await this.mentionCreate();
    }

    private async mentionCreate() {
        const name = Format
        .removeWhiteSpace(this.params[0])
        .split(' ')[0]
        .toLowerCase()
        
        if (this.group!.isMentionExists(name)) {
            await this.notifyReply("Error. nama mention sudah ada")
            return
        }

        const mention = new Mention(name);
        this.group!.addMention(mention)

        const mentionDb = new MentionDb()
        mentionDb.groupName = this.group!.name;
        mentionDb.mentionName = mention.name;
        mentionDb.save();

        await this.notifyReply("Mention ditambahkan.")
    }
}