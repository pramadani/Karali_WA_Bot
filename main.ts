import { setClient } from "./Init/client";
import { Mongoose } from "mongoose";
import { setDB } from "./Init/db";
import qrcode from "qrcode-terminal";
import { Message } from "whatsapp-web.js";
import { handle_message } from "./Handlers/message";
import dotenv from 'dotenv';

dotenv.config();
const MONGODB_URL: string = process.env.MONGODB_URL!;
const BROWSER: string = process.env.BROWSER!;
const FFMPEG: string = process.env.FFMPEG!;

async function init(): Promise<void> {
    const db: Mongoose = await setDB(MONGODB_URL);
    const client = await setClient(db, BROWSER, FFMPEG);

    client.on("ready", (): void => {
        console.log(`bot ready with id: ${client.info.wid.user}`);
    });

    client.on("qr", (qr): void => {
        qrcode.generate(qr, { small: true });
    });

    client.on("message", (message: Message): void => {
        handle_message(message);
    });
}

init();