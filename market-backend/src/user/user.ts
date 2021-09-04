import {
    Entity, PrimaryGeneratedColumn, Column
} from "typeorm";

export class CannotParseDataAsUserError extends Error {
    constructor(msg: string) {
        super(msg);
    }
}

@Entity({
    name: "users"
})
export class User {
       
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
    
    @Column()
    password: string // Hashed

    @Column({ type: 'timestamptz' })
    createdOn: Date;

    static parseFromData(data: any) {
        const { username, password, firstName, lastName, createdOn } = data;
        if (username && password && firstName && lastName && createdOn) {
            const user = new User();
            user.username = username;
            user.password = password;
            user.firstName = firstName;
            user.lastName = lastName;
            user.createdOn = createdOn;
            return user;
        } else
            throw new CannotParseDataAsUserError(
                `Cannot parse with invalid data
                ${JSON.stringify(data, null, 4)} `);
    }

}