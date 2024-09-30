import { Mention } from "./Mention";

export class Group {
    private mentions: Mention[] = [];

    constructor(public name: string) {}

    addMention(mention: Mention) {
        this.mentions.push(mention);
    }

    removeMention(mentionName: string) {
        this.mentions = this.mentions.filter(mention => mention.name !== mentionName);
    }

    getMentions() {
        return this.mentions;
    }

    getMention(name: string): Mention | undefined {
        return this.mentions.find(mention => mention.name === name);
    }

    isMentionExists(mentionName: string): boolean {
        return this.mentions.some(mention => mention.name === mentionName);
    }
}
