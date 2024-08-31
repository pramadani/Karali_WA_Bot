import { setClient } from "./Init/client";
import qrcode from "qrcode-terminal";
import { Client, Message } from "whatsapp-web.js";
import { handle_message } from "./Handlers/message";
import dotenv from 'dotenv';

dotenv.config();
const BROWSER: string = process.env.BROWSER!;
const FFMPEG: string = process.env.FFMPEG!;

async function init() {
    const client: Client = await setClient(BROWSER, FFMPEG);

    client.on("ready", () => {
        console.log(`bot ready with id: ${client.info.wid.user}`);
    });

    client.on("qr", (qr) => {
        qrcode.generate(qr, { small: true });
    });

    client.on("message", (message: Message) => {
        handle_message(message);
    });

    client.on('remote_session_saved', () => {
        console.log("session saved")
    });
    
}

init();