
import { DateTime } from "ionic-angular";
import { AnuncioDetailsPage } from "../../pages/anuncio-details/anuncio-details";

export interface UsuariosI{
    id?:string;
    name: string;
    lastName: string;
    birthDate: DateTime;   
    email: any;
    favorites?:Favorite[];
}

export interface CredencialesI{
    email: any;
    password: string;
}

export interface Favorite{
    favoriteId:string;
}