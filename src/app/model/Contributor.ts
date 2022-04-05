import { EntityManager } from "./EntityManager";

export class Contributor {
    id: number;
    username: string;
    email: string | null;
    roleName: 'Contributor' | 'Administrator';
    creationCount: number;
    updateCount: number;
    deletionCount: number;

    constructor(src: any) {
        this.id = src.id;
        EntityManager.register(this);
        this.username = src.username;
        this.email = src.email;
        this.roleName = src.roleName;
        this.creationCount = src.creationCount;
        this.updateCount = src.updateCount;
        this.deletionCount = src.deletionCount;
    }
}