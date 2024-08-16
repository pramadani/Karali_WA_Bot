import { Client, RemoteAuth } from "whatsapp-web.js";
import { MongoStore } from "wwebjs-mongo";
import { Mongoose } from "mongoose";

let client: Client | undefined;

export async function setClient(mongoose: Mongoose, browser_path: string, ffmpeg_path: string): Promise<Client> {
    client = new Client({
        authStrategy: new RemoteAuth({
            store: new MongoStore({ mongoose }),
            backupSyncIntervalMs: 300000,
        }),

        puppeteer: {
            executablePath: browser_path,
            args: [
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--disable-dev-shm-usage",
                "--disable-gpu",
                "--disable-extensions",
                "--disable-software-rasterizer",
                "--no-zygote",
                "--headless",
            ],
        },

        ffmpegPath: ffmpeg_path,
    });

    await client.initialize();

    return client;
}

export function getClient(): Client {
    if (!client) {
        throw new Error("Client has not been initialized. Call setClient() first.");
    }
    return client;
}
