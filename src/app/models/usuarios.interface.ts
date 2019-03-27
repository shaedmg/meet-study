
import { DateTime } from "ionic-angular";

export interface UsuariosI{
    id?:String;
    name: string;
    lastName: string;
    birthDate: DateTime;   
    email: any;
}

export interface CredencialesI{
    email: any;
    password: String;
}