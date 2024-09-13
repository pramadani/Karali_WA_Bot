import { setClient } from './Init/client';
import { Client, Message } from 'whatsapp-web.js';
import { handleMessage } from './Handlers/message';
import { handleQr } from './Handlers/qr';

const BROWSER_PATH = '/usr/bin/google-chrome-stable';
const FFMPEG_PATH = '/usr/bin/ffmpeg';

async function init(): Promise<void> {
    const client = await setClient(BROWSER_PATH, FFMPEG_PATH);

    client.on('ready', () => {
        console.log(`Bot ready with ID: ${client.info.wid.user}`);
    });

    client.on('qr', handleQr);

    client.on('message', handleMessage);
}

init();