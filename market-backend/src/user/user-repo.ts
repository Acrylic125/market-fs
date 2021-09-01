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

for (let index = 0; index < 100; index++) {
    userRepository.scheduleTask(async (repo) => {
        const user = new User();
        user.username = "User-" + index;
        user.firstName = "Tom";
        user.lastName = "Adams";
        user.password = await hashPassword("abc");
        user.createdOn = new Date();
        repo.save(user);
    });
}
userRepository.load();