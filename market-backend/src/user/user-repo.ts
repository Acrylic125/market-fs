import { EntityRepository, Repository } from "typeorm";
import dbs from "../db/db";
import AsyncSafeLoadScheduler from "../scheduler/async-safeload-scheduler";
import User from "./user";

@EntityRepository(User)
class UserRepository extends Repository<User> {}

const userRepository = new AsyncSafeLoadScheduler<UserRepository>("User Repository", new Promise<UserRepository>(
    (resolve) => 
        dbs.scheduleTask((connection) => 
            resolve(connection.getCustomRepository(UserRepository)))
));

export default userRepository;

export async function createUser(user: User) {
    await userRepository.scheduleTask((repo) => 
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

export function findOneByEmail(email: string) {
    var promise = new Promise<User | undefined>((resolve) => {
        userRepository.scheduleTask((repo) => {
            resolve(repo.createQueryBuilder("user")
                        .where("user.email = :email", { email })
                        .getOne());
        });
    });
    return promise;
}

export function isUsernameTaken(username: string) {
    var promise = new Promise<boolean>((resolve) => {
        findOneByUsername(username).then(user => 
            resolve(user !== undefined));
    });
    return promise;
}

export function isEmailTaken(email: string) {
    var promise = new Promise<boolean>((resolve) => {
        findOneByEmail(email).then(user => 
            resolve(user !== undefined));
    });
    return promise;
}

userRepository.load();