import { DeletedMessage } from './DeletedMessage';
import { EditedMessage } from './EditedMessage';
import { Media } from './Media';

export class MessageCache {
    private static deletedMessageCache: DeletedMessage[] = [];
    private static editedMessageCache: EditedMessage[] = [];
    private static mediaCache: Media[] = [];

    public static get deletedMessages(): DeletedMessage[] {
        return this.deletedMessageCache;
    }

    public static addDeletedMessage(message: DeletedMessage): void {
        this.deletedMessageCache.push(message);
    }

    public static get editedMessages(): EditedMessage[] {
        return this.editedMessageCache;
    }

    public static addEditedMessage(message: EditedMessage): void {
        this.editedMessageCache.push(message);
    }

    public static get mediaMessages(): Media[] {
        return this.mediaCache;
    }

    public static addMediaMessage(media: Media): void {
        this.mediaCache.push(media);
    }
}
