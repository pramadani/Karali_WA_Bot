export class Format {
    private static PARAMS_SEPARATOR = '..';

    public static isIncludeParams(message: string): boolean {
        return message.includes(this.PARAMS_SEPARATOR);
    }

    public static getParams(message: string): string[] {
        return this
        .removeWhiteSpace(message)
        .split(this.PARAMS_SEPARATOR)
        .slice(1)
        .filter(Boolean)
    }

    public static removeWhiteSpace(text: string): string {
        return text
        .replace(/\n/g, " ")
        .replace(/\r/g, " ")
        .replace(/\s+/g, ' ')
        .trim()
    }

    public static getTagsNonNumber(input: string): string[] {
        return this
        .removeWhiteSpace(input)
        .split(' ')
        .filter(part => part.startsWith("@"))
        .map(part => part.substring(1).toLowerCase())
        .filter(part => /^[a-zA-Z0-9]+$/.test(part))
        .filter(part => !/^\d+$/.test(part))
        .filter(part => part !== 'a');
    }
    
}