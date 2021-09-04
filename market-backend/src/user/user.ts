import {
    Entity, PrimaryGeneratedColumn, Column
} from "typeorm";

@Entity({
    name: "users"
})
export class User {
       
    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @Column({
        length: 32,
        default: "no_username"
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

}