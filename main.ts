import { WhatsAppClient } from "./Init/client";
import { Mongoose } from "mongoose";
import { setDB } from "./Init/db";
import qrcode from "qrcode-terminal";
import { Client, Message } from "whatsapp-web.js";
import { handle_message } from "./Handlers/message";
import dotenv from 'dotenv';

dotenv.config();
const MONGODB_URL: string = process.env.MONGODB_URL!;
const BROWSER: string = process.env.BROWSER!;
const FFMPEG: string = process.env.FFMPEG!;

let clientInstance: Client;

async function init(): Promise<void> {
    const db: Mongoose = await setDB(MONGODB_URL);
    const waClient = new WhatsAppClient(db, BROWSER, FFMPEG);
    clientInstance = waClient.clientInstance;

    clientInstance.on("ready", (): void => {
        console.log(`bot ready with id: ${clientInstance.info.wid.user}`);
    });

    clientInstance.on("qr", (qr: string): void => {
        qrcode.generate(qr, { small: true });
    });

    clientInstance.on("message", (message: Message): void => {
        handle_message(message);
    });
}

init();

export { clientInstance };