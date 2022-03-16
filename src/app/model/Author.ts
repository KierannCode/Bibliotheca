export interface Author {
    id: number;
    name: string;
    releaseCount: number;
    firstRelease: Date | null;
    lastRelease: Date | null;
}