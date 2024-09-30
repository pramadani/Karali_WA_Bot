import { DeletedMessage } from './DeletedMessage';
import { EditedMessage } from './EditedMessage';
import { Media } from './Media';

export class MessageCache {
    private deletedMessageCache: DeletedMessage[] = [];
    private editedMessageCache: EditedMessage[] = [];
    private mediaCache: Media[] = [];

    public get deletedMessages(): DeletedMessage[] {
        return this.deletedMessageCache;
    }

    public addDeletedMessage(message: DeletedMessage): void {
        this.deletedMessageCache.push(message);
    }

    public get editedMessages(): EditedMessage[] {
        return this.editedMessageCache;
    }

    public addEditedMessage(message: EditedMessage): void {
        this.editedMessageCache.push(message);
    }

    public get mediaMessages(): Media[] {
        return this.mediaCache;
    }

    public addMediaMessage(media: Media): void {
        this.mediaCache.push(media);
    }
}

export const messageCache = new MessageCache();