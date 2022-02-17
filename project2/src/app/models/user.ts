import { Favorites } from "./favorites";
import { Group } from "./group";

export class User {
    public favs:Array<Favorites>
    constructor(public id:number, 
        public email:string, 
        public firstName:string, 
        public lastName:string, 
        public group:Group, 
        public roleId:number, 
        public role:string,
        favs:Array<Favorites>
        ){this.favs = favs}
}
