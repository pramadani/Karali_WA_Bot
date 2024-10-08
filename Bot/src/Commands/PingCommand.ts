import { Command } from "./CommandModels/Command";

export class PingCommand extends Command {

    public async exec() {
        await this.notifyReply("Bot aktif.")
    }
}
