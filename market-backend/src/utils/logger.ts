import chalk from "chalk";

module logger {
    export interface LoggerOptions {
        prxLoading: string,
        prxSuccess: string,
        prxError: string,
        prxWarn: string,    
    }
    
    export const DEFAULT_OPTIONS: LoggerOptions = {
        prxLoading: chalk.blueBright("LOAD"),
        prxSuccess: chalk.greenBright("SUCCESS"),
        prxError: chalk.redBright("ERROR"),
        prxWarn: chalk.yellow("WARN"),
    }
    
    export function log(...message: any[]) {
        console.log(...message);
    }
    
    export function warn(...warnings: any[]) {
        console.warn(DEFAULT_OPTIONS.prxWarn, ...warnings);
    }
    
    export function error(...errors: any[]) {
        console.error(DEFAULT_OPTIONS.prxError, ...errors);
    }
    
    export function success(...message: any[]) {
        console.log(DEFAULT_OPTIONS.prxSuccess, ...message);
    }
    
    export function load(...message: any[]) {
        console.log(DEFAULT_OPTIONS.prxLoading, ...message);
    }
}

export default logger;