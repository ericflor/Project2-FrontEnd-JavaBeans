export class Decisions {
    public id:number; 
    public roundId:number; 
    public imdbId:string; 
    public title:string; 
    public choice:boolean; 
    public userId:number;
    //adjust constructor to match Db
    constructor(obj?:any){
        this.id = obj?.id ?? 0
        this.roundId= obj?.roundId ?? 0
        this.imdbId= obj?.imdbId ?? ""
        this.title= obj?.title ?? ""
        this.choice= obj?.choice ?? true
        this.userId= obj?.userId ?? 0
    }
}