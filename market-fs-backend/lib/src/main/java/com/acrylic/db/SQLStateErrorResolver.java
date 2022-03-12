package com.acrylic.db;

import org.apache.commons.lang3.ArrayUtils;

import java.sql.SQLException;
import java.util.*;
import java.util.stream.Collectors;

public class SQLStateErrorResolver<E extends SQLException>
    implements SQLErrorResolver<E>, Cloneable {

    private static final SQLStateErrorResolver<SQLException> DEFAULT_POSTGRES =
            builder()
                    .resolve(SQLError.DUPLICATE, "21000", "23505")
                    .resolve(SQLError.DATA_SIZE_OUT_OF_BOUNDS, "22001")
                    .build();

    public static SQLStateErrorResolver<SQLException> postgres() {
        return DEFAULT_POSTGRES;
    }

    public static <E extends SQLException> Builder<E> builder() {
        return new Builder<>();
    }

    public static <E extends SQLException> Builder<E> builder(SQLStateErrorResolver<E> resolver) {
        return new Builder<>(resolver.stateErrorBindings);
    }

    public static class Builder<E extends SQLException> {
        private final Map<Object, SQLError> stateErrorBindings;

        Builder() {
            this(new HashMap<>());
        }

        Builder(Map<Object, SQLError> stateErrorBindings) {
            this.stateErrorBindings = stateErrorBindings;
        }

        public Builder<E> resolve(SQLError sqlError, String state) {
            this.stateErrorBindings.put(state, sqlError);
            return this;
        }

        public Builder<E> resolve(SQLError sqlError, String... states) {
            for (String state : states)
                this.resolve(sqlError, state);
            return this;
        }

        public SQLStateErrorResolver<E> build() {
            return new SQLStateErrorResolver<>(this.stateErrorBindings);
        }
    }

    private final Map<Object, SQLError> stateErrorBindings;

    SQLStateErrorResolver() {
        this(new HashMap<>());
    }

    SQLStateErrorResolver(Map<Object, SQLError> stateErrorBindings) {
        this.stateErrorBindings = stateErrorBindings;
    }

    @Override
    public Optional<SQLError> resolve(E exception) {
        return Optional.ofNullable(stateErrorBindings.get(exception.getSQLState()));
    }

    @Override
    public SQLStateErrorResolver<E> clone() {
        return new SQLStateErrorResolver<>(
                new HashMap<>(this.stateErrorBindings));
    }

    @Override
    public String toString() {
        return """
                Bindings: %s,
                Resolved: %s,
                Unresolved: %s
                """.formatted(this.stateErrorBindings.toString(), this.resolvedSQLErrors().toString(), this.unresolvedSQLErrors().toString());
    }

    public Collection<SQLError> resolvedSQLErrors() {
        return stateErrorBindings.values();
    }

    public Collection<SQLError> unresolvedSQLErrors() {
        Collection<SQLError> resolved = this.resolvedSQLErrors();
        return Arrays.stream(SQLError.values())
                .filter(sqlError -> !resolved.contains(sqlError))
                .collect(Collectors.toList());
    }
}
