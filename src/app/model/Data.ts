import { Contribution } from "./Contribution";
import { EntityManager } from "./EntityManager";

export class Data {
    id: number;
    creation: Contribution;
    lastUpdate: Contribution;

    constructor(src: any) {
        this.id = src.id;
        EntityManager.register(this);
        if (typeof src.creation === 'number') {
            this.creation = EntityManager.get(src.creation);
        } else {
            this.creation = new Contribution(src.creation);
        }
        if (typeof src.lastUpdate === 'number') {
            this.lastUpdate = EntityManager.get(src.lastUpdate);
        } else {
            this.lastUpdate = new Contribution(src.lastUpdate);
        }
    }
}