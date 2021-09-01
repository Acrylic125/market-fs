import { EntityRepository, Repository } from "typeorm";
import dbs from "../db/db";
import { User } from "./user";

@EntityRepository(User)
class UserRepository extends Repository<User> {



}

async function loadRepo() {
    return await dbs.scheduleSupplier((connection) =>
        connection.getCustomRepository(UserRepository));
}

const userRepository = dbs.scheduleTask(() => loadRepo());

