export class Decisions {
    public id: number;
    public roundId: number;
    public imdbId: string;
    public title: string;
    public choice: boolean;
    public userId: number;
    //adjust constructor to match Db
    constructor(object: any) {
        this.id = object?.id ?? 0
        this.roundId = object?.roundId ?? 1
        this.imdbId = object?.imdbId ?? ""
        this.title = object?.title ?? ""
        this.choice = object?.choice ?? false
        this.userId = object?.userId ?? 0
    }
}