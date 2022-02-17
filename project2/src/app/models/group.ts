export class Group {
    public id:number;
    public name:string;
    public open:boolean;
    //constructor();
    //constructor(obj:Group);
    constructor(obj?:any){
        this.id = obj?.id ?? 0
        this.name = obj?.name ?? ""
        this.open = obj?.open ?? true
    }

}
