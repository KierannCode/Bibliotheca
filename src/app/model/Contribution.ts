import { Contributor } from "./Contributor";
import { Data } from "./Data";
import { EntityManager } from "./EntityManager";

export class Contribution {
    id: number;
    timestamp: Date;
    type: string;
    data: Data;
    contributor: Contributor;

    constructor(src: any) {
        this.id = src.id;
        EntityManager.register(this);
        this.timestamp = new Date(`${src.timestamp}Z`);
        this.type = src.type;
        if (typeof src.data === 'number') {
            this.data = EntityManager.get(src.contributor);
        } else {
            this.data = new Data(src.data);
        }
        if (typeof src.contributor === 'number') {
            this.contributor = EntityManager.get(src.contributor);
        } else {
            this.contributor = new Contributor(src.contributor);
        }
    }
}