package com.acrylic.db;

import org.apache.commons.lang3.ArrayUtils;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

public class SQLStateErrorResolver<E extends SQLException>
    implements SQLErrorResolver<E>, Cloneable {

    public static <E extends SQLException> Builder<E> builder() {
        return new Builder<>();
    }

    public static class Builder<E extends SQLException> {
        private final Map<Object, SQLError> stateErrorBindings = new HashMap<>();

        Builder() {}

        public Builder<E> resolve(SQLError sqlError, String state) {
            this.stateErrorBindings.put(sqlError, state);
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


}
