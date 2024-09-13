export function italic(text: string): string {
    return `_${text}_`;
}

export function bold(text: string): string {
    return `*${text}*`;
}

export function strikethrough(text: string): string {
    return `~${text}~`;
}

export function monospace(text: string): string {
    return `\`\`\`${text}\`\`\``;
}

export function bulletedList(text: string): string {
    return `* ${text}`;
}

export function quote(text: string): string {
    return `> ${text}`;
}

export function inlineCode(text: string): string {
    return `\`${text}\``;
}
