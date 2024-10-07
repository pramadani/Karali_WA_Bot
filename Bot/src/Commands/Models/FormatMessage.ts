export class FormatMessage {
    public static italic(text: string): string {
        return `_${text}_`;
    }

    public static bold(text: string): string {
        return `*${text}*`;
    }

    public static strikethrough(text: string): string {
        return `~${text}~`;
    }

    public static monospace(text: string): string {
        return `\`\`\`${text}\`\`\``;
    }

    public static bulletedList(text: string): string {
        return `* ${text}`;
    }

    public static quote(text: string): string {
        return `> ${text}`;
    }

    public static inlineCode(text: string): string {
        return `\`${text}\``;
    }
}
