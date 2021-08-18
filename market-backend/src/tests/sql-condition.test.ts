import { NOT_CONDITION_OPTION, SQLConditionType } from "../db/sql/condition/sql-condition";
import { groupCondition, ifBetween, ifEqualTo, ifGreaterThan, ifGreaterThanOrEqualTo, ifLike, ifLikeString, ifNotEqualTo, ifSmallerThan, ifSmallerThanOrEqualTo } from "../db/sql/condition/sql-condition-factory";

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
        ), 
    `(NOT balance > 420 AND username = 'postgres' OR (username = 'alternate' AND (accessto = true OR city = 'New York')))`
);

testSQLCondition(
    groupCondition(ifEqualTo('group', 'admin'))
        .and(groupCondition(ifLike('username', '-root'))
            .orAll(
                ifEqualTo('access', true),
                groupCondition(ifGreaterThanOrEqualTo('reputation', 100000))
                    .nand(ifEqualTo('banned', true))
            )
        ),
     `(group = 'admin' AND (username LIKE '-root' OR access = true OR (reputation >= 100000 AND NOT banned = true)))`
)

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
    ifNotEqualTo('balance', 69),
    'balance <> 69'
);

testSQLCondition(
    ifBetween('balance', 69, 420),
    'balance BETWEEN 69 AND 420'
);

testSQLCondition(
    ifLike('username', 'abc'),
    `username LIKE 'abc'`
);

testSQLCondition(
    ifLikeString('username', 'abc'),
    `username LIKE '%abc%'`
);

testSQLCondition(
    ifGreaterThan('balance', 69, NOT_CONDITION_OPTION),
    'NOT balance > 69'
);

