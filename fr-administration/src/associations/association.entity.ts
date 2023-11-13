import {User} from "../users/user.entity";
import {Column, Entity, ManyToOne, ManyToMany, JoinTable, PrimaryGeneratedColumn, Repository} from "typeorm";

@Entity()
export class Association {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(() => User)
    @JoinTable()
    users: Repository<User>;

    @Column()
    name: string;

    constructor(users : Repository<User>, name: string,) {

        this.users=users;
        this.name=name;
    }

}