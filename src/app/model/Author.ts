export interface Author {
    id: number;
    romanizedName: string;
    originalName: string;
    chapterCount: number;
    firstRelease: Date | null;
    lastRelease: Date | null;
}