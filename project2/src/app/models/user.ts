import { Favorites } from "./favorites";
import { Group } from "./group";

export class User {
    //public favs:Array<Favorites>
    public id:number;
    public username:string;
    public password:string; 
    public email:string;
    public firstName:string; 
    public lastName:string; 
    public group:Group; 
    public roleId:number; 
    //public role:string;
    constructor(obj?:User
        //favs:Array<Favorites>
        ){
            this.id = obj?.id ?? 0
            this.username = obj?.username ?? ""
            this.password = obj?.password ?? ""
            this.email = obj?.email ?? ""
            this.firstName = obj?.firstName ?? ""
            this.lastName = obj?.lastName ?? ""
            this.group = obj?.group ?? new Group()
            this.roleId = obj?.roleId ?? 0
        }//this.favs = favs}
}
