import axios from "axios";
import { Member } from "./Member";

export class Mention {
    private members: Member[] = [];

    constructor(private _name: string) {}

    public get name(): string {
        return this._name;
    }

    public set name(newName: string) {
        this._name = newName;
    }

    addMember(member: Member) {
        this.members.push(member);
    }

    removeMember(memberId: string) {
        this.members = this.members.filter(member => member.id !== memberId);
    }

    getMembers() {
        return this.members;
    }

    isMemberExists(memberId: string): boolean {
        return this.members.some(member => member.id === memberId);
    }
}