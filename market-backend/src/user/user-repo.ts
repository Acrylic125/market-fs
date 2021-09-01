import { EntityRepository, Repository } from "typeorm";
import dbs from "../db/db";
import AsyncSafeLoadScheduler from "../scheduler/async-safeload-scheduler";
import { User } from "./user";

@EntityRepository(User)
class UserRepository extends Repository<User> {



}

const userRepository = new AsyncSafeLoadScheduler<UserRepository>("User Repository", new Promise<UserRepository>(
    (resolve) => 
        dbs.scheduleTask((connection) => 
            resolve(connection.getCustomRepository(UserRepository)))
));
userRepository.load();

userRepository.scheduleTask((repo) => {
    const user = new User();
    user.firstName = "Tom";
    user.lastName = "Adams";
    user.password = "abc";
    console.log("Saving...");
    repo.save(user);
    console.log("Saved!");
})