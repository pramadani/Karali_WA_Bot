const params: string = ".."

export function isIncludeParams(message: string): boolean {
    if (message.includes(params)) {
        return true
    }
    else {
        return false
    }
}

export function getParams(message: string): string[] {
    return message
        .split(params)
        .slice(1)
        .filter(Boolean)
        .map(param => param.trim())
}