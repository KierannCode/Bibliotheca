export class Loading {
    progress = 1;

    isOver(): boolean {
        return this.progress == 1;
    }
}