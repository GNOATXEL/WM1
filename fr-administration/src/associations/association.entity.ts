export class Association {
    id: number;
    idUsers : number[];
    name: string;

    constructor(id:number,users : User[], name: string,) {

        this.id=id;
        this.users=users;
        this.name=name;
    }

}