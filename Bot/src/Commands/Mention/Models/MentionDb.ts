import axios from "axios";
import { Group } from "./Group";
import { Mention } from "./Mention";
import { Member } from "./Member";

export class MentionDb {
    private url: string = "http://mention:5000";
    public groupName: string | undefined;
    public mentionName: string | undefined;
    public newMentionName: string | undefined;
    public memberId: string | undefined;

    async save() {
        if (this.groupName) {
            await this.saveGroup();
        }
        if (this.mentionName) {
            await this.saveMention();
        }
        if (this.memberId) {
            await this.saveMember();
        }
    }
    
    async saveGroup() {
        try {
            await axios.post(`${this.url}/groups/create/${this.groupName}`)
        } catch {}
    }

    async saveMention() {
        try {
            await axios.post(`${this.url}/mentions/create/${this.groupName}/${this.mentionName}`)
        } catch {}
    }

    async saveMember() {
        try {
            await axios.post(`${this.url}/members/create/${this.groupName}/${this.mentionName}/${this.memberId}`)
        } catch {}
    }

    async fetch(): Promise<Group[]> {
        const groups: Group[] = [];
    
        while (true) {
            try {
                console.log("Fetching data from database...");
    
                const response = await axios.get(`${this.url}/groups/all`);
                const fetchedGroups = response.data;
    
                for (const groupName of fetchedGroups) {
                    const group = new Group(groupName);
    
                    // Fetch mentions for the group
                    const mentionsResponse = await axios.get(`${this.url}/mentions/all/${group.name}`);
                    const mentionsData = mentionsResponse.data;
    
                    for (const mentionName of mentionsData) {
                        const mention = new Mention(mentionName);
                        group.addMention(mention);
    
                        // Fetch members for the mention
                        const membersResponse = await axios.get(`${this.url}/members/all/${group.name}/${mention.name}`);
                        const membersData = membersResponse.data;
    
                        for (const memberPhoneNumber of membersData) {
                            const member = new Member(memberPhoneNumber);
                            mention.addMember(member);
                        }
                    }
                    groups.push(group);
                }
    
                console.log("Data fetched successfully");
                return groups;
    
            } catch {
                console.error('Error fetching data from database, retrying in 5 seconds');
                await new Promise(resolve => setTimeout(resolve, 5000));
            }
        }
    }
}
