export class ErrorMap extends Map<string, Array<string>> {

    put(key: string, message: string) {
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