package com.acrylic.db;

import java.sql.SQLException;
import java.util.Optional;

public interface SQLErrorResolver<E extends SQLException> {

    Optional<SQLError> resolve(E exception);

}
