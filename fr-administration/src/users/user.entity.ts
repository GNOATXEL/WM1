// user.entity.ts
import {PrimaryGeneratedColumn,Column} from "typeorm";


export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    lastname: string;

    @Column()
    firstname: string;

    @Column()
    age: number;

    constructor(lastname: string, firstname: string, age:number) {
        this.lastname = lastname;
        this.firstname = firstname;
        this.age=age
    }

}
