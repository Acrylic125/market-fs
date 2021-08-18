import { SQLCondition, 
         SQLConditionGroup,
         SQLConditionOptions, 
         SQLConditionType, 
        } from "./sql-condition";
import { SQLSingleComparator } from "./sql-condition-keywords";

function formatToSafeSQLValue(formatFor: any) {
    if (typeof(formatFor) === 'string') 
        return `'${formatFor}'`;
    return formatFor;
}

export function singleComparator<T>(key: string, comparator: SQLSingleComparator, val: T, options?: SQLConditionOptions) {
    return new SQLCondition(`${key} ${comparator} ${formatToSafeSQLValue(val)}`, options);
}

export function ifEqualTo<T>(key: string, equalTo: T, options?: SQLConditionOptions) {
    return singleComparator(key, '=', equalTo, options);
}

export function ifNotEqualTo<T>(key: string, notEqualTo: T, options?: SQLConditionOptions) {
    return singleComparator(key, '<>', notEqualTo, options);
}

export function ifLike<T>(key: string, likeTo: T, options?: SQLConditionOptions) {
    return singleComparator(key, 'LIKE', likeTo, options);
}

export function ifLikeString(key: string, likeTo: string, options?: SQLConditionOptions) {
    return singleComparator(key, 'LIKE', `%${likeTo}%`, options);
}

export function ifGreaterThan<T>(key: string, greaterThan: T, options?: SQLConditionOptions) {
    return singleComparator(key, '>', greaterThan, options);
}

export function ifGreaterThanOrEqualTo<T>(key: string, greaterThanOrEqalTo: T, options?: SQLConditionOptions) {
    return singleComparator(key, '>=', greaterThanOrEqalTo, options);
}

export function ifSmallerThan<T>(key: string, smallerThan: T, options?: SQLConditionOptions) {
    return singleComparator(key, '<', smallerThan, options);
}

export function ifSmallerThanOrEqualTo<T>(key: string, smallerThanOrEqualTo: T, options?: SQLConditionOptions) {
    return singleComparator(key, '<=', smallerThanOrEqualTo, options);
}

export function ifBetween<T>(key: string, betweenLower: T, betweenUpper: T, options?: SQLConditionOptions) {
    return new SQLCondition(`${key} BETWEEN ${formatToSafeSQLValue(betweenLower)} AND ${formatToSafeSQLValue(betweenUpper)}`, options);
}

export function groupCondition(startingCondition: SQLConditionType) {
    return new SQLConditionGroup(startingCondition);
}