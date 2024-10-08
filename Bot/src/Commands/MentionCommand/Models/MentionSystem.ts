import { MentionDb } from "./MentionDb";
import { Group } from "./Group";

export class MentionSystem {
    private groups: Group[] = [];

    constructor() {
        this.initialize()
    }

    async initialize() {
        this.groups = await new MentionDb().fetch();
    }

    addGroup(group: Group) {
        this.groups.push(group);
    }

    getGroups() {
        return this.groups;
    }

    getGroup(name: string): Group | undefined {
        return this.groups.find(group => group.name === name);
    }

    isGroupExists(name: string): boolean {
        return this.groups.some(group => group.name === name);
    }
}

export const mentionSystem = new MentionSystem();