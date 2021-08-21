import { hashPassword } from "./password";
import User from "./user";
import { UsersTable } from "./user-db";

export interface UserCreateOptions {
    username: string,
    password: string,
    email: string,
    firstName: string,
    lastName: string
}

export function validateUserData(data: any) {
    return ('username' in data) && 
           ('id' in data) &&
           ('email' in data);
}

export function parseUserFromDBObject(data: any): User {
    const user = Object.assign({}, data);
    delete user.password;
    return user;
}

export async function getUserByID(id: string) {
    const user = await UsersTable.findByPk(id);
    return (user) ? parseUserFromDBObject(user.toJSON()) : null;
}

export async function getUserByUsername(username: string) {
    const user = await UsersTable.findOne({
        where: {
            username: username
        }
    });
    return (user) ? parseUserFromDBObject(user.toJSON()) : null;
}

export async function createUser(options: UserCreateOptions): Promise<User> {
    const hashedPassword = await hashPassword(options.password);
    const user = await UsersTable.create({
        username: options.username,
        email: options.email,
        password: hashedPassword,
        firstName: options.firstName,
        lastName: options.lastName
    });
    return parseUserFromDBObject(user.toJSON());
}

createUser({
    username: "John03",
    password: "abc",
    firstName: "John",
    lastName: "Smith",
    email: "jsmith@gmail.com"
});
getUserByID("88bce827-1b73-414f-a077-8e188e65be7c");

// const userTest = async (name: string) => {
//     const user = await createUser({
//         username: name,
//         password: "abc",
//         email: name + "@gmail.com"
//     });
//     console.log("User: ", user);    
// };

