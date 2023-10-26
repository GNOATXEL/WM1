// user.entity.ts
export class User {
    id: number;
    lastname: string;
    firstname: string;
    age: number;

    constructor(id:number,lastname: string, firstname: string, age:number) {
        this.lastname = lastname;
        this.firstname = firstname;
        this.id=id;
        this.age=age
    }

}
