export class Decisions {

    //adjust constructor to match Db
    constructor(public id:number, public roundId:number, public imdbId:string, public choice:boolean, public userId:number){}
}