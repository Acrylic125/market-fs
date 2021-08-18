import { SQLConditionType } from "./condition/sql-condition";
import { SQLStringify } from "./sql-command";

export class SQLWhere implements SQLStringify {
    constructor(public condition: SQLConditionType) {}

    toSQLString(): string {
        return `WHERE ${this.condition.toSQLString()}`;
    }
}

export function newWhere(condition: SQLConditionType) {
    return new SQLWhere(condition);
}