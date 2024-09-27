export class ParamParser {
    private static PARAMS_SEPARATOR = '..';

    public static isIncludeParams(message: string): boolean {
        return message.includes(this.PARAMS_SEPARATOR);
    }

    public static getParams(message: string): string[] {
        return message
            .split(this.PARAMS_SEPARATOR)
            .slice(1)
            .filter(Boolean)
            .map(param => param.trim());
    }
}