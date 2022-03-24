import { EntityManager } from "./EntityManager";

export class Contributor {
    id: number;
    username: string;
    email: string | null;
    roleName: string;

    constructor(src: any) {
        this.id = src.id;
        EntityManager.register(this);
        this.username = src.username;
        this.email = src.email;
        this.roleName = src.roleName;
    }
}