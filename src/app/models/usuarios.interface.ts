
import { DateTime } from "ionic-angular";

export interface UsuariosI{
    id?:string;
    name: string;
    lastName: string;
    birthDate: DateTime;   
    email: any;
}

export interface CredencialesI{
    email: any;
    password: string;
}