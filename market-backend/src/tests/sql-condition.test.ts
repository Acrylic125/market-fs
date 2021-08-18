import { NOT_CONDITION_OPTION, SQLConditionType } from "../db/sql/condition/sql-condition";
import { groupCondition, ifEqualTo, ifGreaterThan, ifGreaterThanOrEqualTo, ifSmallerThan, ifSmallerThanOrEqualTo } from "../db/sql/condition/sql-condition-functions";

function testSQLCondition(sqlCondition: SQLConditionType, desiredSQL: string) {
    test(`should SQL condition match '${desiredSQL}'`, () => 
        expect(sqlCondition.toSQLString()).toBe(desiredSQL))
}

testSQLCondition(
    groupCondition(ifGreaterThan('balance', 420, NOT_CONDITION_OPTION))
        .and(ifEqualTo('username', `postgres`))
        .or(groupCondition(ifEqualTo('username', 'alternate'))
            .and(groupCondition(ifEqualTo('accessto', true))
                .or(ifEqualTo('city', 'New York'))
            )
        ), `(NOT balance > 420 AND username = 'postgres' OR (username = 'alternate' AND (accessto = true OR city = 'New York')))`);

testSQLCondition(
    ifEqualTo('balance', 420),
    'balance = 420'
);

testSQLCondition(
    ifGreaterThan('balance', 420),
    'balance > 420'
);

testSQLCondition(
    ifGreaterThanOrEqualTo('balance', 420),
    'balance >= 420'
);

testSQLCondition(
    ifSmallerThan('balance', 420),
    'balance < 420'
);

testSQLCondition(
    ifSmallerThanOrEqualTo('balance', 420),
    'balance <= 420'
);

testSQLCondition(
    ifGreaterThan('balance', 69, NOT_CONDITION_OPTION),
    'NOT balance > 69'
);