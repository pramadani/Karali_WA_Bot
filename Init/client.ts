import { Client, RemoteAuth } from "whatsapp-web.js";
import { MongoStore } from "wwebjs-mongo";
import { Mongoose } from "mongoose";

export class WhatsAppClient {
    private client: Client;

    constructor(mongoose: Mongoose, browser_path: string, ffmpeg_path: string) {
        this.client = new Client({
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

        this.client.initialize();
    }

    public get clientInstance(): Client {
        return this.client;
    }
}
