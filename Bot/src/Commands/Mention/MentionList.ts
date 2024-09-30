import { FormatMessage } from "../../Bot/FormatMessage";
import { MentionCommand } from "./MentionCommand";

export class MentionListCommand extends MentionCommand {

    protected async do(): Promise<void> {
        await this.mentionList();
    }

    private async mentionList() {
        const mentions = this.group!.getMentions();

        if (mentions.length === 0) {
            await this.notifyReply("Belum ada mention ditambahkan.")
            return
        }

        let text = mentions
        .map(mention => {
            const memberNames = mention.getMembers()
                .map(member => FormatMessage.italic(member.id.replace("@c.us", '')))
                .join("\n");
    
            return `${FormatMessage.bold(mention.name)}\n${memberNames || '-'}`;
        })
        .join("\n\n");
    
        await this.notifyReply("List mention terdaftar.");
        await this.chat?.sendMessage(text.trim());
    }

}
