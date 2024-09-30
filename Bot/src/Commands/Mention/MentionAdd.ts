import { Command } from "../Command";
import { FormatMessage } from "../../Bot/FormatMessage";
import { mentionSystem } from "./Models";
import { Group } from "./Models/Group";
import { Member } from "./Models/Member";
import { MentionDb } from "./Models/MentionDb";

export class MentionAddCommand extends Command {

    public async exec(): Promise<void> {
        await this.getChat();
        if (!await this.checkIsGroupChat()) return;
        if (!await this.checkIsAdmin) return;
        await this.addMember();
    }

    private async getGroup() {
        if (!mentionSystem.isGroupExists(this.msg.from)) {
            mentionSystem.addGroup(new Group(this.msg.from))
        }
        const group = mentionSystem.getGroup(this.msg.from);
        return group
    }

    private async addMember() {
        if (!this.params[0]) {
            await this.notifyReply('Error. Berikan param mention terlebih dahulu.');
            return
        }
        if (this.msg.mentionedIds.length === 0 && !this.checkHasSelfTag()) {
            await this.notifyReply('Error. Berikan tag pada orang yang ingin dimasukkan ke dalam mention.');
            return
        }
        
        const group = await this.getGroup();
        const name = this.params[0]
            .replace(/\n/g, " ")
            .replace(/\r/g, " ")
            .trim()
            .split(' ')[0]
        
        if (!group?.isMentionExists(name)) {
            await this.notifyReply('Error. Nama mention belum ada.');
            return
        }

        const mention = group?.getMention(name)

        if (this.checkHasSelfTag()) {
            const memberExists = mention?.isMemberExists(this.msg.author!);
            if (!memberExists) {
                const member = new Member(this.msg.author!);
                mention?.addMember(member);
                const mentionDb = new MentionDb()
                mentionDb.groupName = group.name;
                mentionDb.mentionName = mention?.name;
                mentionDb.memberId = member.id;
                mentionDb.save();
            }
        }

        for (const mentionedId of this.msg.mentionedIds) {
            const memberExists = mention?.isMemberExists(String(mentionedId));
            if (!memberExists) {
                const member = new Member(String(mentionedId));
                mention?.addMember(member);
                const mentionDb = new MentionDb()
                mentionDb.groupName = group.name;
                mentionDb.mentionName = mention?.name;
                mentionDb.memberId = member.id;
                mentionDb.save();
            }
        }

        await this.msg.reply(
            FormatMessage.quote(
                FormatMessage.italic(`Member ditambahkan.`)
            )
        );
    }
}
