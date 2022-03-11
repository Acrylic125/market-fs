package com.acrylic.db;

import java.sql.SQLException;
import java.util.Optional;

public class SQLStateErrorResolver
    implements SQLErrorResolver<SQLException> {

    @Override
    public Optional<SQLError> resolve(SQLException exception) {
        return Optional.empty();
    }


}
