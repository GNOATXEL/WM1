// user.entity.ts
export class User {
    id: number;
    lastname: string;
    firstname: string;

    constructor(id:number,lastname: string, firstname: string) {
        this.lastname = lastname;
        this.firstname = firstname;
        this.id=id;
    }

}
