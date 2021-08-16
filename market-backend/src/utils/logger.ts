import chalk from "chalk";

module logger {
    export interface LoggerOptions {
        prxLoading: string,
        prxChecking: string,
        prxAction: string,
        prxSuccess: string,
        prxError: string,
        prxWarn: string,    
    }
    
    export const DEFAULT_OPTIONS: LoggerOptions = {
        prxLoading: chalk.blueBright("LOAD"),
        prxChecking: chalk.blueBright("CHECK"),
        prxAction: chalk.blueBright("ACTION"),
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

    export function check(...message: any[]) {
        console.log(DEFAULT_OPTIONS.prxChecking, ...message);
    }

    export function action(...message: any[]) {
        console.log(DEFAULT_OPTIONS.prxAction, ...message);
    }
}

export default logger;

export interface LoggableOptions {
    logErrors: boolean,
    logWarns: boolean,
    logLoad: boolean,
    logSuccess: boolean,
    logChecks: boolean
}

export const DEFAULT_LOGGABLE_OPTIONS: LoggableOptions = {
    logErrors: true,
    logWarns: true,
    logLoad: true,
    logSuccess: true,
    logChecks: true
};
