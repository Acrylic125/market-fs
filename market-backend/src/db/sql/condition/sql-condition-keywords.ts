// https://www.w3schools.com/sql/sql_operators.asp
export type SQLMathComparator = '=' | '<' | '>' | '>=' | '<=' | '<>';
export type SQLSingleComparator = SQLMathComparator | 'LIKE';
export type SQLManyComparator = 'IN';
export type SQLRangeComparator = 'BETWEEN';
export type SQLSubqueryComparator = 'IN' | 'ALL' | 'ANY' | 'EXISTS' | 'SOME';
export type SQLConditionLinkOperator = 'AND' | 'OR';
export type SQLConditionLinkOperatorWrapper = SQLConditionLinkOperator | 'AND NOT' | 'OR NOT';
export type SQLConditionGlobalModifier = 'NOT';
