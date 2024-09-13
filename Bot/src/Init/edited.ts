import { Message } from 'whatsapp-web.js';

export interface EditedMessage {
    message: Message,
    newBody: String,
    prevBody: String
}

const deletedMessageCache: Message[] = [];

export function getDeletedMessageCache(): Message[] {
    return deletedMessageCache;
}

// on(event: 'message_edit', listener: (
//     /** The message that was affected */
//     message: Message,
//     /** New text message */
//     newBody: String,
//     /** Prev text message */
//     prevBody: String
// ) => void): this