import { Message } from 'whatsapp-web.js';

export type DeletedMessage = Message;

const deletedMessageCache: Message[] = [];

export function getDeletedMessageCache(): Message[] {
    return deletedMessageCache;
}