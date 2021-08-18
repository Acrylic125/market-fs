import { SQLConditionType } from "./condition/sql-condition";
import { SQLStringify } from "./sql-command";

class SQLWhere implements SQLStringify {
    constructor(public condition: SQLConditionType) {}

    toSQLString(): string {
        return `WHERE ${this.condition.toSQLString()}`;
    }
}