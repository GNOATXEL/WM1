// 2entity.ts
import {PrimaryGeneratedColumn, Column, Entity} from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    lastname: string;

    @Column()
    firstname: string;

    @Column()
    age: number;

    @Column()
    password: string;

    constructor(lastname: string, firstname: string, age:number, password:string) {
        this.lastname = lastname;
        this.firstname = firstname;
        this.age=age;
        this.password=password;
    }

}
