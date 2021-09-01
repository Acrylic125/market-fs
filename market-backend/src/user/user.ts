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
        length: 32
    })
    username: string;

    @Column({
        length: 32
    })
    firstName: string;
    
    @Column({
        length: 32
    })
    lastName: string;
    
    @Column()
    password: string

    @Column({ type: 'timestamptz' })
    createdOn: Date;

}