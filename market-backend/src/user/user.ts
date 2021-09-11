import {
    Entity, PrimaryGeneratedColumn, Column
} from "typeorm";
import { hashPassword } from "./password";

export class CannotParseDataAsUserError extends Error {
    constructor(msg: string) {
        super(msg);
    }
}

@Entity({
    name: "users"
})
export default class User {
       
    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @Column({
        length: 32
    })
    username: string;

    @Column({
        length: 32,
        default: "first_name"
    })
    firstName: string;
    
    @Column({
        length: 32,
        default: "no_last_name"
    })
    lastName: string;

    @Column({
        length: 32,
        default: "nomail@nomail.com"
    })
    email: string;
    
    @Column()
    password: string // Hashed

    @Column({ type: 'timestamptz' })
    createdOn: Date;

    static async parseFromRequestData(data: any) {
        data.password = (data.password) ? await hashPassword(data.password) : undefined;
        return User.parseFromData(data); 
    }

    static parseFromData(data: any) {
        const { id, username, email, password, firstName, lastName, createdOn } = data;
        if (email && username && password && firstName && lastName) {
            const user = new User();
            user.id = id;
            user.username = username;
            user.email = email;
            user.password = password;
            user.firstName = firstName;
            user.lastName = lastName;
            user.createdOn = (createdOn) ? createdOn : new Date();
            return user;
        } else
            throw new CannotParseDataAsUserError(
                `Cannot parse with invalid data\n
                ${JSON.stringify(data, null, 4)} `);
    }

}