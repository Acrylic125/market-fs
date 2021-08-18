import { raw } from "express";
import { SQLStringify } from "../sql-command";
import { SQLConditionGlobalModifier, SQLConditionLinkOperator, SQLConditionLinkOperatorWrapper } from "./sql-condition-keywords";

export type SQLConditionType = SQLCondition | SQLConditionGroup;

export interface SQLConditionOptions {
    readonly modifiers: Array<SQLConditionGlobalModifier>
}

export const NOT_MODIFIER: Array<SQLConditionGlobalModifier> = ['NOT'];
export const NOT_CONDITION_OPTION: SQLConditionOptions = {
    modifiers: NOT_MODIFIER
};

export interface SQLCondition extends SQLStringify {
    rawStatement: string,
    conditionOptions?: SQLConditionOptions
}

export function newConditionWthRawStatement(rawStatement: string, conditionOptions?: SQLConditionOptions): SQLCondition {
    return {
        rawStatement: rawStatement,
        conditionOptions: conditionOptions,
        toSQLString: () => {
            var composedStatement = rawStatement;
            if (conditionOptions) {
                const { modifiers } = conditionOptions;
                modifiers.forEach((modifier) => 
                    composedStatement = `${modifier} ${composedStatement}`);
            }
            return composedStatement;
        }
    }
}

export class SQLConditionGroup implements SQLStringify {
    private statement: string;
    
    constructor(condition: SQLConditionType) {
        this.statement = condition.toSQLString();
    }

    public append(operand: SQLConditionLinkOperatorWrapper, condition: SQLConditionType): SQLConditionGroup {
        this.statement += (` ${operand} ${condition.toSQLString()}`);
        return this;
    }

    public appendAll(operand: SQLConditionLinkOperatorWrapper, conditions: SQLConditionType[]) {
        conditions.forEach((condition) => this.append(operand, condition));
        return this;
    }

    public or(condition: SQLConditionType) {
        return this.append('OR', condition);
    }

    public and(condition: SQLConditionType) {
        return this.append('AND', condition);
    }

    public nor(condition: SQLConditionType) {
        return this.append('OR NOT', condition);
    }

    public nand(condition: SQLConditionType) {
        return this.append('AND NOT', condition);
    }

    public orAll(...conditions: SQLConditionType[]) {
        return this.appendAll('OR', conditions)
    }

    public andAll(...conditions: SQLConditionType[]) {
        return this.appendAll('AND', conditions)
    }

    public norAll(...conditions: SQLConditionType[]) {
        return this.appendAll('OR NOT', conditions)
    }

    public nandAll(...conditions: SQLConditionType[]) {
        return this.appendAll('AND NOT', conditions)
    }

    public toSQLString() {
        return `(${this.statement})`;
    }
} 
