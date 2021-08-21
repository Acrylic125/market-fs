import { STRING, UUID, UUIDV4 } from "sequelize";
import sequelize from "../db/postgres";

export const UsersTable = sequelize.define("users", {
    id: {
        type: UUID,
        primaryKey: true,
        defaultValue: UUIDV4,
    },
    username: {
        type: STRING,
        defaultValue: "user-nil",
        allowNull: false
    },
    email: {
        type: STRING,
        defaultValue: "none@nomail.com",
        allowNull: false
    },
    password: {
        type: STRING,
        defaultValue: "",
        allowNull: false
    }
});
