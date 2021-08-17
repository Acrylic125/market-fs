import { SQLStringify } from "./sql-command";

export interface SQLCondition extends SQLStringify {
    not: boolean,
    condition: string
}

export type SQLConditionOperation = null | 'AND' | 'OR';

export interface SQLConditionChain {
    operation: SQLConditionOperation,
    condition: SQLCondition,
    next: SQLConditionChain
}

const WHERE = "WHERE";
export class SQLConditions implements SQLStringify {

    constructor(private conditions: Array<SQLCondition> = []) {}

    toSQLString(): string {
        return '(' + this.conditions.reduce() + ')';
    }
}


export class SQLCoditionsBuilder {
    constructor(private conditions: SQLConditions = new SQLConditions()) {

    }
}