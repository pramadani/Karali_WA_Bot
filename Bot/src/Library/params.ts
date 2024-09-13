const PARAMS_SEPARATOR = '..';

export function isIncludeParams(message: string): boolean {
    return message.includes(PARAMS_SEPARATOR);
}

export function getParams(message: string): string[] {
    return message
        .split(PARAMS_SEPARATOR)
        .slice(1)
        .filter(Boolean)
        .map(param => param.trim());
}
