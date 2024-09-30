import { Command } from "./Command";

export class PingCommand extends Command {

    public async exec() {
        await this.notifyReply("Bot aktif.")
    }
}
