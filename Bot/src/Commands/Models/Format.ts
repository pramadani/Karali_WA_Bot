import { Config } from "../../Bot/Config";
import { FormatMessage } from "./FormatMessage";

export class Format {

    public static getParams(message: string): string[] {
        return this
        .removeWhiteSpace(message)
        .split(Config.PARAMS_SEPARATOR)
        .slice(1)
        .map(part => part.trim())
        .filter(Boolean);
    }

    public static getSubCommand(message: string): string[] {
        return this
        .removeWhiteSpace(message)
        .toLowerCase()
        .split(" ")
        .filter(part => part.startsWith(Config.COMMAND_SEPARATOR) && part.match(/^\.[^.]/))
        .map(part => part.substring(1).trim())
        .slice(1)
        .filter(Boolean);
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
        .toLowerCase()
        .split(' ')
        .filter(part => part.startsWith("@"))
        .map(part => part.substring(1))
        .filter(part => /^[a-zA-Z0-9]+$/.test(part))
        .filter(part => !/^\d+$/.test(part))
        .filter(part => part !== Config.TAG_ALL)
        .filter(part => part !== Config.TAG_SELF);
    }

    public static removeServer(text: string): string {
        return text.replace(Config.WA_SERVER, "");
    }
    
    public static notifyFormat(text: string) {
        return FormatMessage.quote(FormatMessage.italic(text))
    }
    
}