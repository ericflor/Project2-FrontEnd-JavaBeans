export class Decisions {

    //adjust constructor to match Db
    constructor(public id:string, public roundId:number, public imdbId:string, public open:boolean, public userId:number){}
}