// 2entity.ts
import {User} from "../users/user.entity";
import {PrimaryGeneratedColumn, Column, Entity, ManyToMany, JoinTable, OneToMany, OneToOne,ManyToOne} from "typeorm";
import {Association} from "../associations/association.entity";

@Entity()
export class Role {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(()=> User )
    @JoinTable()
    idUser: number;

    @ManyToOne(()=>Association)
    @JoinTable()
    idAssociation: number;

    constructor(Rolename:string, idUser:number,idAssociation:number) {
        this.name = Rolename;
        this.idUser = idUser;
        this.idAssociation = idAssociation
    }

}
