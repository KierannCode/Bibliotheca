import { Data } from "./Data";

export class Author extends Data {
    romanizedName: string;
    originalName: string;
    chapterCount: number;
    firstRelease: Date | null;
    lastRelease: Date | null;

    modified = false;

    constructor(src: any) {
        super(src);
        this.romanizedName = src.romanizedName;
        this.originalName = src.originalName;
        this.chapterCount = src.chapterCount;
        this.firstRelease = src.firstRelease;
        this.lastRelease = src.lastRelease;
    }
}