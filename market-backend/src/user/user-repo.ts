import { EntityRepository, Repository } from "typeorm";
import { User } from "./user";

@EntityRepository()
class UserRepository extends Repository<User> {



}

const userRepository = 