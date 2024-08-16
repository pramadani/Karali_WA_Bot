import { Client, LocalAuth, Message } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";

const client: Client = new Client({
    authStrategy: new LocalAuth()
});

client.on("qr", (qr: string) => {
    qrcode.generate(qr, { small: true });
});

client.on("ready", (): void => {
    console.log("Client Ready!");
    console.log(client.info.wid.user)
});

client.on("message", (message: Message) => {
    console.log(`Pesan diterima: ${message.body}`);

    if (message.body.toLowerCase() === "halo") {
        message.reply("Halo juga!");
    }
});

client.initialize();

export { client }