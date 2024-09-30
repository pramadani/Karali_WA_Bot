import { Command } from "./Command";

export class StickerCommand extends Command {
    private stickerName: string = '';

    public async exec() {
        await this.getChat()
        if (!await this.checkHasMedia()) return;
        if (!await this.canDownloadMedia()) return;
        if (!await this.validateMediaFormat(["image", "video"])) return;

        await this.sendSticker();
    }

    private async sendSticker() {
        this.stickerName = this.params.length > 0 ? this.params[0] : '';

        this.chat!.sendMessage(this.media!, {
            stickerName: this.stickerName,
            sendMediaAsSticker: true,
        });
    }
}
