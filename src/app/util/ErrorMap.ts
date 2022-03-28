export class ErrorMap extends Map<string, Array<string>> {
    override get(key: string): Array<string> {
        let value = super.get(key);
        if (value == undefined) {
            return new Array<string>();
        }
        return value;
    }
}