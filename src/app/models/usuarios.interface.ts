
import { DateTime } from "ionic-angular";

export interface UsuariosI{
    id?:string;
    name: string;
    lastName: string;
    birthDate: DateTime;   
    email: any;
    generalValoration:number;
    favorites?:Favorite[];
}

export interface CredencialesI{
    email: any;
    password: string;
}

export interface Favorite{
    favoriteId:string;
}