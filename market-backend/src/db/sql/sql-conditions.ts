import { SQLStringify } from "./sql-command";

export type SQLConditionLinkOperator = 'AND' | 'OR';
export type SQLConditionGlobalModifier = 'NOT';
// https://www.w3schools.com/sql/sql_operators.asp
export type SQLLogicalOperator = '=' | 'LIKE' | 'IN' | 'ALL' | '';
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

function formatToSafeSQLValue(formatFor: any) {
    if (typeof(formatFor) === 'string') 
        return `'${formatFor}'`;
    return formatFor;
}

export function ifEqualTo(key: string, equalTo: any, options?: SQLConditionOptions) {
    return new SQLCondition(`${key} = ${formatToSafeSQLValue(equalTo)}`, options);
}

export function ifLike(key: string, likeTo: any, options?: SQLConditionOptions) {
    return new SQLCondition(`${key} LIKE ${formatToSafeSQLValue(likeTo)}`, options);
}

export function ifGreaterThan(key: string, greaterThan: any, options?: SQLConditionOptions) {
    return new SQLCondition(`${key} > ${formatToSafeSQLValue(greaterThan)}`, options);
}

export function ifGreaterThanOrEqualTo(key: string, greaterThanOrEqalTo: any, options?: SQLConditionOptions) {
    return new SQLCondition(`${key} >= ${formatToSafeSQLValue(greaterThanOrEqalTo)}`, options);
}

export function ifSmallerThan(key: string, smallerThan: any, options?: SQLConditionOptions) {
    return new SQLCondition(`${key} < ${formatToSafeSQLValue(smallerThan)}`, options);
}

export function ifSmallerThanOrEqualTo(key: string, smallerThanOrEqualTo: any, options?: SQLConditionOptions) {
    return new SQLCondition(`${key} <= ${formatToSafeSQLValue(smallerThanOrEqualTo)}`, options);
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

export function groupCondition(startingCondition: SQLConditionType) {
    return new SQLConditionGroup(startingCondition);
}

console.log(formatToSafeSQLValue('Test'));