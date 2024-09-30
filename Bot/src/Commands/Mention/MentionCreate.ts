import axios from "axios";
import { Command } from "../Command";
import { FormatMessage } from "../../Bot/FormatMessage";
import { mentionSystem } from "./Models";
import { Group } from "./Models/Group";
import { Member } from "./Models/Member";
import { Mention } from "./Models/Mention";
import { MentionDb } from "./Models/MentionDb";


export class MentionCreateCommand extends Command {

    public async exec(): Promise<void> {
        await this.getChat();
        if (!await this.checkIsGroupChat()) return;
        if (!await this.checkIsAdmin()) return;
        await this.mentionCreate();
    }

    private async getGroup() {
        if (!mentionSystem.isGroupExists(this.msg.from)) {
            const group = new Group(this.msg.from);
            mentionSystem.addGroup(group)
            const mentionDb = new MentionDb()
            mentionDb.groupName = group?.name;
            await mentionDb.save()
        }
        const group = mentionSystem.getGroup(this.msg.from);
        return group
    }

    private async mentionCreate() {
        if (!this.params[0]) {
            await this.notifyReply('Error. Berikan nama mention terlebih dahulu.');
            return
        }
        
        const group = await this.getGroup();
        const name = this.params[0]
            .replace(/\n/g, " ")
            .replace(/\r/g, " ")
            .trim()
            .split(' ')[0]
        
        if (group?.isMentionExists(name)) {
            await this.notifyReply("Error. nama mention sudah ada")
            return
        }

        const mention = new Mention(name);
        group?.addMention(mention)

        const mentionDb = new MentionDb()
        mentionDb.groupName = group?.name;
        mentionDb.mentionName = mention?.name;
        mentionDb.save();

        await this.notifyReply("Mention ditambahkan.")
    }
}