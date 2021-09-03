import { EntityRepository, Repository } from "typeorm";
import dbs from "../db/db";
import AsyncSafeLoadScheduler from "../scheduler/async-safeload-scheduler";
import { hashPassword } from "./password";
import { User } from "./user";

@EntityRepository(User)
class UserRepository extends Repository<User> {

}

const userRepository = new AsyncSafeLoadScheduler<UserRepository>("User Repository", new Promise<UserRepository>(
    (resolve) => 
        dbs.scheduleTask((connection) => 
            resolve(connection.getCustomRepository(UserRepository)))
));

export async function createUser(user: User) {
    userRepository.scheduleTask(async (repo) => 
        repo.save(user));
}

export function findOneByID(id: string) {
    var promise = new Promise<User | undefined>((resolve) => {
        userRepository.scheduleTask((repo) => {
            resolve(repo.createQueryBuilder("user")
                        .where("user.id = :id", { id })
                        .getOne());
        });
    });
    return promise;
}

export function findOneByUsername(username: string) {
    var promise = new Promise<User | undefined>((resolve) => {
        userRepository.scheduleTask((repo) => {
            resolve(repo.createQueryBuilder("user")
                        .where("user.username = :username", { username })
                        .getOne());
        });
    });
    return promise;
}

userRepository.load();