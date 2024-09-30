import { FormatMessage } from "../../Bot/FormatMessage";
import { Command } from "../Command";
import { mentionSystem } from "./Models";
import { Group } from "./Models/Group";


export class MentionListCommand extends Command {

    public async exec(): Promise<void> {
        await this.getChat();
        if (!await this.checkIsGroupChat()) return;
        await this.mentionList();
    }

    private async getGroup() {
        if (!mentionSystem.isGroupExists(this.msg.from)) {
            mentionSystem.addGroup(new Group(this.msg.from))
        }
        const group = mentionSystem.getGroup(this.msg.from);
        return group
    }

    private async mentionList() {
        const group = await this.getGroup();

        const mentions = group?.getMentions();

        if (!mentions) {
            await this.notifyReply("Belum ada mention ditambahkan.")
            return
        }

        let text = "";

        for (const mention of mentions!) {
            text += `${FormatMessage.bold(mention.name)}\n`;

            const members = mention.getMembers();
            if (members && members.length > 0) {
                const memberNames = members.map(member => {
                    return FormatMessage.italic(
                        member.id.replace("@c.us", '')
                    );
                }).join("\n");
                text += `${memberNames}\n`;
            } else {
                text += "-\n";
            }
        }

        await this.notifyReply("Berikut list mention terdaftar.");
        await this.chat?.sendMessage(text.trim());
    }

}
