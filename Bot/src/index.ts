import { Bot } from './Bot/Bot';

async function startBot() {
    await Bot.initializeClient();
}

startBot();