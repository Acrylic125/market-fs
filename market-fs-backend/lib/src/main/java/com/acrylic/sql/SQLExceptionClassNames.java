package com.acrylic.sql;

public enum SQLExceptionClassNames {

    POSTGRES("org.postgresql.util.PSQLException");

    private final String className;

    SQLExceptionClassNames(String className) {
        this.className = className;
    }

    public String getClassName() {
        return className;
    }

    public boolean isClass(Class<?> clazz) {
        return clazz.getName().equals(this.getClassName());
    }
}
