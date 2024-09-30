import { Command } from "../Command";
import { Group } from "./Models/Group";
import { mentionSystem } from "./Models/MentionSystem";

export abstract class MentionCommand extends Command {
    protected group: Group | undefined;

    public async exec(): Promise<void> {
        await this.getChat();
        if (!await this.checkIsGroupChat()) return;
        this.group = await this.getGroup();
        await this.do();
    }

    protected async getGroup(): Promise<Group | undefined> {
        if (!mentionSystem.isGroupExists(this.message.from)) {
            mentionSystem.addGroup(new Group(this.message.from))
        }
        const group = mentionSystem.getGroup(this.message.from)!;
        return group
    }

    protected abstract do(): Promise<void>
}
