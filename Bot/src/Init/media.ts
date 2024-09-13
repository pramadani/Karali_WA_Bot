import { MessageMedia } from 'whatsapp-web.js';

export interface Media {
    key: string;
    media: MessageMedia;
}

const mediaCache: Media[] = [];

export function getMediaCache(): Media[] {
    return mediaCache;
}
