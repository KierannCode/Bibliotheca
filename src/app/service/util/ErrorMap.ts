export class ErrorMap extends Map<string, Array<string>> {

    override get(key: string): Array<string> {
        let array = super.get(key);
        if (array == undefined) {
            return new Array;
        }
        return array;
    }

    put(key: string, message: string): void {
        if (this.has(key)) {
            this.get(key)?.push(message);
        } else {
            this.set(key, Array.of(message));
        }
    }

    import(map: Map<string, Array<string>>): void {
        for (let key of map.keys()) {
            for(let message of map.get(key)!) {
                this.put(key, message);
            }
        }
    }
}