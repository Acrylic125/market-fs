import { groupCondition, ifEqualTo, ifGreaterThan, NOT_CONDITION_OPTION, NOT_MODIFIER, SQLConditionGroup } from "../db/sql/sql-conditions";

test(`should SQL condition equal to '(NOT balance > 420 AND username = 'postgres' OR (username = 'alternate' AND (accessto = true OR city = 'New York')))'`, () => {
    expect(
        groupCondition(ifGreaterThan('balance', 420, NOT_CONDITION_OPTION))
            .and(ifEqualTo('username', `postgres`))
            .or(groupCondition(ifEqualTo('username', 'alternate'))
                .and(groupCondition(ifEqualTo('accessto', true))
                    .or(ifEqualTo('city', 'New York'))
                )
            )
        .toSQLString()
    ).toBe(`(NOT balance > 420 AND username = 'postgres' OR (username = 'alternate' AND (accessto = true OR city = 'New York')))`);
});

