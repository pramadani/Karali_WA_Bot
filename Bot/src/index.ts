import { setClient } from "./Init/client";
import { Client, Message } from "whatsapp-web.js";
import { handle_message } from "./Handlers/message";
import { handle_qr } from "./Handlers/qr";

const BROWSER: string = "/usr/bin/google-chrome-stable";
const FFMPEG: string = "/usr/bin/ffmpeg";

async function init() {
    const client: Client = await setClient(BROWSER, FFMPEG);

    client.on("ready", () => {
        console.log(`bot ready with id: ${client.info.wid.user}`);
    });

    client.on("qr", (qr) => {
        handle_qr(qr)
    });

    client.on("message", (message: Message) => {
        handle_message(message);
    });    
}

init();