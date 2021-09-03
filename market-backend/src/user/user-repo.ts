import { EntityRepository, Repository } from "typeorm";
import dbs from "../db/db";
import AsyncSafeLoadScheduler from "../scheduler/async-safeload-scheduler";
import { hashPassword } from "./password";
import { User } from "./user";

@EntityRepository(User)
class UserRepository extends Repository<User> {

    findOneByID(id: string) {
        return this.createQueryBuilder("user")
            .where("user.id = :id", { id })
            .getOne();
    }

    findByID(id: string) {
        return this.createQueryBuilder("user")
            .where("user.id = :id", { id })
            .getMany();
    }

    findOneByUsername(username: string) {
        return this.createQueryBuilder("user")
            .where("user.firstName = :username", { username })
            .getOne();
    }

    findByName(firstName: string, lastName: string) {
        return this.createQueryBuilder("user")
            .where("user.firstName = :firstName", { firstName })
            .andWhere("user.lastName = :lastName", { lastName })
            .getMany();
    }

}

const userRepository = new AsyncSafeLoadScheduler<UserRepository>("User Repository", new Promise<UserRepository>(
    (resolve) => 
        dbs.scheduleTask((connection) => 
            resolve(connection.getCustomRepository(UserRepository)))
));

async function createUser(user: User) {
    userRepository.scheduleTask(async (repo) => 
        repo.save(user));
}

userRepository.load();