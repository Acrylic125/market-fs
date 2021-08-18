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

export function singleComparator(key: string, comparator: SQLSingleComparator, val: any, options?: SQLConditionOptions) {
    return new SQLCondition(`${key} ${comparator} ${formatToSafeSQLValue(val)}`, options);
}

export function ifEqualTo(key: string, equalTo: any, options?: SQLConditionOptions) {
    return singleComparator(key, '=', equalTo, options);
}

export function ifLike(key: string, likeTo: any, options?: SQLConditionOptions) {
    return singleComparator(key, 'LIKE', likeTo, options);
}

export function ifGreaterThan(key: string, greaterThan: any, options?: SQLConditionOptions) {
    return singleComparator(key, '>', greaterThan, options);
}

export function ifGreaterThanOrEqualTo(key: string, greaterThanOrEqalTo: any, options?: SQLConditionOptions) {
    return singleComparator(key, '>=', greaterThanOrEqalTo, options);
}

export function ifSmallerThan(key: string, smallerThan: any, options?: SQLConditionOptions) {
    return singleComparator(key, '<', smallerThan, options);
}

export function ifSmallerThanOrEqualTo(key: string, smallerThanOrEqualTo: any, options?: SQLConditionOptions) {
    return singleComparator(key, '<=', smallerThanOrEqualTo, options);
}

export function groupCondition(startingCondition: SQLConditionType) {
    return new SQLConditionGroup(startingCondition);
}