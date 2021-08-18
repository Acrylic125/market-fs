import { SQLStringify } from "../sql-command";
import { SQLConditionGlobalModifier, SQLConditionLinkOperator } from "./sql-condition-keywords";

export type SQLConditionType = SQLCondition | SQLConditionGroup;

export interface SQLConditionOptions {
    readonly modifiers: Array<SQLConditionGlobalModifier>
}

export const NOT_MODIFIER: Array<SQLConditionGlobalModifier> = ['NOT'];
export const NOT_CONDITION_OPTION: SQLConditionOptions = {
    modifiers: NOT_MODIFIER
};

export class SQLCondition implements SQLStringify {
    constructor(public rawStatement: string, 
                public conditionOptions?: SQLConditionOptions) {}

    public toSQLString() {
        const { conditionOptions } = this;
        var composedStatement = this.rawStatement;
        if (conditionOptions) {
            const { modifiers } = conditionOptions;
            modifiers.forEach((modifier) => 
                composedStatement = `${modifier} ${composedStatement}`);
        }
        return composedStatement;
    }
}

export class SQLConditionGroup implements SQLStringify {
    private statement: string;
    
    constructor(condition: SQLConditionType) {
        this.statement = condition.toSQLString();
    }

    public append(operand: SQLConditionLinkOperator, condition: SQLConditionType): SQLConditionGroup {
        this.statement += (` ${operand} ${condition.toSQLString()}`);
        return this;
    }

    public or(condition: SQLConditionType) {
        return this.append('OR', condition);
    }

    public and(condition: SQLConditionType) {
        return this.append('AND', condition);
    }

    public toSQLString() {
        return `(${this.statement})`;
    }
} 
