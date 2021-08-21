import { hashPassword } from "./password";
import { UsersTable } from "./user-db";

export interface UserCreateOptions {
    username: string,
    password: string,
    email: string
}

export async function createUser(options: UserCreateOptions) {
    const hashedPassword = await hashPassword(options.password);
    const user = await UsersTable.create({
        username: options.username,
        email: options.email,
        password: hashedPassword
    });
    const userAsJSON = (user.toJSON() as any);
    return {
        username: userAsJSON.username,
        id: userAsJSON.id,
        email: userAsJSON.email
    };
}

const userTest = async () => {
    const user = await createUser({
        username: "abc",
        password: "abc",
        email: "abc@gmail.com"
    });
    console.log("User: ", user);    
};

userTest();