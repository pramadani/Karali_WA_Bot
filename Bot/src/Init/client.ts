import { Client, LocalAuth } from 'whatsapp-web.js';

let client: Client | undefined;

export async function setClient(browserPath: string, ffmpegPath: string): Promise<Client> {
    client = new Client({
        authStrategy: new LocalAuth(),
        puppeteer: {
            executablePath: browserPath,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu',
                '--disable-extensions',
                '--disable-software-rasterizer',
                '--no-zygote',
                '--headless',
            ],
        },
        ffmpegPath,
    });

    await client.initialize();
    return client;
}

export function getClient(): Client {
    if (!client) {
        throw new Error('Client has not been initialized. Call setClient() first.');
    }
    return client;
}
