import { Client, LocalAuth } from 'whatsapp-web.js';
import { MessageHandler } from '../Handlers/MessageHandler';
import { QrHandler } from '../Handlers/QrHandler';

export class Bot {
    private static client: Client | undefined;

    private static browserPath: string = '/usr/bin/google-chrome-stable';
    private static ffmpegPath: string = '/usr/bin/ffmpeg';

    private static messageHandler: MessageHandler = new MessageHandler();
    private static qrHandler: QrHandler = new QrHandler();

    public static async initializeClient(): Promise<void> {
        this.client = new Client({
            authStrategy: new LocalAuth(),
            puppeteer: {
                executablePath: this.browserPath,
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
            ffmpegPath: this.ffmpegPath,
        });

        this.setupEventHandlers();

        await this.client.initialize();
    }

    private static setupEventHandlers(): void {
        this.client?.on('ready', 
            () => {
                console.log(`Bot ready with ID: ${this.client!.info.wid.user}`)
            }
        );

        this.client?.on('qr', 
            (qr) => {
                this.qrHandler.sendQr(qr)
            }
        );
        
        this.client?.on('message', 
            (message) => {
                this.messageHandler.handleMessage(message)
            }
        );
    }

    public static get clientInstance(): Client {
        return this.client!;
    }
}
