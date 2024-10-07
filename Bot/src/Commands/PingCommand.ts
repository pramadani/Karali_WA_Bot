import { Command } from "./Models/Command";

export class PingCommand extends Command {

    public async exec() {
        await this.notifyReply("Bot aktif.")
    }
}
